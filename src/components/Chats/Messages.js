import React, { useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Badge, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { addMessage, changeMessage, deleteMessage } from '../../store/messages/actions';
import { selectMessages } from '../../store/messages/selectors';
import { profile } from '../../store/profile/selectors';
import { scrollTop } from '../../utils/constants';

const Messages = React.memo(({ chatId, chatExists }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { user } = useSelector(profile, shallowEqual);
  const messagesList = useSelector(selectMessages, shallowEqual);
  const [message, setMessage] = useState('');
  const [msgListEl, setMsgListEl] = useState(null);
  const [msgBtn, setMsgBtn] = useState(false);
  const [msgI, setMsgI] = useState(0);

  const currMsgList = Object.values(messagesList[chatId] || {});

  useEffect(() => {
    if (!!chatExists) {
      setMsgListEl(document.getElementById(chatId));
      setMessage('');
    }
    if (!!chatExists && !!msgListEl) {
      document.getElementById("msgs").scrollIntoView(false);
      scrollMsg();
      msgListEl.addEventListener('scroll', setScrollMsg);
    }

    return () => {
      if (!!msgListEl) msgListEl.removeEventListener('scroll', setScrollMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, msgListEl]);

  useEffect(() => {
    if(!!currMsgList.length && !!msgListEl) {
      if (msgListEl.scrollTop + scrollTop < msgListEl.scrollHeight) {
        setTimeout(() => {
          setMsgBtn(true);
          setMsgI(msgI + 1);
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currMsgList.length]);

  const scrollMsg = () => {
    setTimeout(() => {
      msgListEl.scrollBy(0, msgListEl.scrollHeight);
    }, 0);
    //msgListEl.scrollTop = msgListEl.scrollHeight; //msgListEl.clientHeight;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const setScrollMsg = () => {
    if (msgListEl.scrollTop + scrollTop >= msgListEl.scrollHeight) {
      setTimeout(() => {
        setMsgBtn(false);
        setMsgI(0);
      }, 101);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const setMsg = useCallback(({ id, message }) => {
    if (!!msgListEl) {
      const msgEl = document.getElementById(id);
      if (!!msgEl && !msgEl.childNodes.length) {
        msgEl.innerHTML = message;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgListEl]);

  const handleMsgBtn = () => {
    scrollMsg();
    setMsgBtn(false);
    setMsgI(0);
  };

  const handleChangeMessage = (e) => {
    if (e.target.value.length < 300) setMessage(e.target.value);
  };

  const handleAddMessage = async (e) => {
    e.preventDefault();
    const reg1 = message.match(/^\s/);
    const reg2 = message.match(/^\s+.+/);
    let d = new Date().toLocaleDateString().replace(/\./g, '');
    let text = message.replace(/\r?\n/g, '<br />');

    if (!!message && !!user.id && (!reg1 || !!reg2)) {
      const id = `msg_${d}${Date.now().toString().slice(3, -2)}`;
      const time = new Date().toLocaleTimeString("ru", {hour: 'numeric', minute: 'numeric',});
      const date = new Date().toLocaleDateString("ru", {day: 'numeric', month: 'long',});
      const lastMsg = currMsgList[currMsgList.length - 1] || '';

      const obj = {
        id,
        time,
        date,
        message: text,
        userId: user.id,
        userName: user.name,
        userRole: user.role,
      };

      if (!currMsgList.length || lastMsg.date !== date) {
        await dispatch(addMessage(chatId, { ...obj, showDate: true }));
      } else await dispatch(addMessage(chatId, { ...obj, showDate: false }));
      scrollMsg();
      setMessage('');
    }
    inputRef.current.focus();
  };

  const handleDeleteMessage = (msg) => {
    const { id, showDate } = msg;
    const res = window.confirm('Подтвердите удаление сообщения!');

    if (!!res && !showDate) {
      dispatch(deleteMessage(chatId, id));
    }
    if (!!res && !!showDate) {
      const i = currMsgList.indexOf(msg) + 1;
      const nextMsg = currMsgList[i];
      const obj = {
        showDate: true,
      };
      if (!!nextMsg) {
        dispatch(deleteMessage(chatId, id));
        dispatch(changeMessage(chatId, nextMsg.id, obj));
      } else dispatch(deleteMessage(chatId, id));
    }
  };

  return (
    <div id="msgs" className="messages">
      {!!chatId ? (
        <>
          {!messagesList[chatId] && (
            <div className="notMessages">
              <p className="notMessages__text">
                Сообщений нет
              </p>
            </div>
          )}
          <div className="messages__heading">
            <h4>{chatExists?.name}</h4>
          </div>
          <div id={chatId} className="messages__list">
            {currMsgList.map(message =>
              <div className="messageWrap" key={message.id}>
                {!!message.showDate && (
                  <h4 className="msgDate">{message.date}</h4>
                )}
                <div className="msg">
                  <p className={message.userRole === 'admin' ? "adminText msg__name" : "userText msg__name"}>
                    {message.userName}
                    <span>{message.time}</span>
                  </p>
                  <p className="msg__text" id={message.id}>
                    {setMsg(message)}
                  </p>
                  <div className="msg__del">
                    {(user.id === message.userId) && (
                      <IconButton size='small' onClick={() => handleDeleteMessage(message)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <form className="messages__form" onSubmit={handleAddMessage}>
            <TextField
              type="text"
              label="Сообщение..."
              variant="outlined"
              fullWidth
              autoFocus={false}
              inputRef={inputRef}
              multiline
              maxRows={3}
              value={message}
              onChange={handleChangeMessage}
            />
            <IconButton type="submit" color="primary">
              <SendIcon fontSize="large" />
            </IconButton>
          </form>
          {!!msgBtn && (
            <div className="msgBtn">
              <Badge className="msgBtn__badge"
                color='primary'
                badgeContent={msgI}
                showZero={true}
                invisible={!msgI}
              >
                <IconButton
                  color="primary"
                  size="medium"
                  disableRipple={true}
                  onClick={handleMsgBtn}
                >
                  <ExpandMoreIcon fontSize="large" />
                </IconButton>
              </Badge>
            </div>
          )}
        </>
      ) : (
        <div className="notChats">
          <p className="notChats__text">
            Выбери чат
          </p>
        </div>
      )}
    </div>
  );
});

export default Messages;
