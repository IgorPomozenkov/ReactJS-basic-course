import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { TextField, Button, List, ListItem, IconButton, ListItemSecondaryAction, CircularProgress, Badge } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { addChat, deleteChat, initChats } from '../../store/chats/actions';
import { chatsLoading, selectChats } from '../../store/chats/selectors';
import { userAdmin } from '../../store/profile/selectors';
import Messages from './Messages';
import { initMessages } from '../../store/messages/actions';
import { selectMessages } from '../../store/messages/selectors';
import "./Chats.css";

export default function Chats() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { chatId } = useParams();
  const chatsList = useSelector(selectChats, shallowEqual);
  const messagesList = useSelector(selectMessages, shallowEqual);
  const loading = useSelector(chatsLoading, shallowEqual);
  const admin = useSelector(userAdmin, shallowEqual);
  const [chatName, setChatName] = useState('');

  const chatExists = useMemo(() => (chatsList || []).find(({ id }) => id === chatId), [chatId, chatsList]);
  //console.log(chatExists);

  useEffect(() => {
    document.querySelector('.heading').textContent = 'Chats App';

    dispatch(initChats());
    dispatch(initMessages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!chatId && !chatExists) {
      history.push('/chats');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleChangeChat = (e) => {
    if (e.target.value.length <= 25) setChatName(e.target.value);
  };

  const handleAddChat = (e) => {
    e.preventDefault();
    let d = new Date().toLocaleDateString().replace(/\./g, '');
    if (!!chatName) {
      const id = `${d}_${Date.now().toString().slice(3, -2)}`;
      const obj = {
        id,
        name: chatName,
      };
      dispatch(addChat(obj));
    }
    setChatName('');
  };

  const handleDeleteChat = (id) => {
    const res = window.confirm('Подтвердите удаление чата!');
    if (!!res) dispatch(deleteChat(id));
  };

  return (
    <div className="chatsPage pageContent">
      {loading && <CircularProgress className="reqLoading" />}
      <div className="chatsPage__content">
        <div className="chats">
          {!chatId ? (
            <>
              <form className="chats__form" onSubmit={handleAddChat}>
                <TextField
                  type="text"
                  label="Добавить чат"
                  title="введи название"
                  color="primary"
                  disabled={!admin}
                  value={chatName}
                  onChange={handleChangeChat}
                />
              </form>
              <List className="chats__list">
                {chatsList.map(chat =>
                  <ListItem className="chats__item"
                    key={chat.id}
                    button
                    divider
                    onClick={() => history.push(`/chats/${chat.id}`)}
                  >
                    <Badge className="chats__badge"
                      color='primary'
                      badgeContent={Object.values(messagesList[chat.id] || {}).length}
                      showZero={true}
                      invisible={!Object.values(messagesList[chat.id] || {}).length}
                    >
                      {chat.name}
                    </Badge>
                    {admin && (
                      <ListItemSecondaryAction
                        children={
                          <IconButton
                            onClick={() => handleDeleteChat(chat.id)}
                            edge="end"
                            size='small'
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      />
                    )}
                  </ListItem>
                )}
              </List>
            </>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIosIcon fontSize='small' />}
              onClick={() => history.push('/chats')}
            >
              назад к чатам
            </Button>
          )}
        </div>
        <Messages
          chatId={chatId}
          chatExists={chatExists}
        />
      </div>
    </div>
  );
};
