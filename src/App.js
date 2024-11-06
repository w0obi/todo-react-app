import { useEffect, useState } from 'react';
import './App.css';
import Todo from './component/Todo';
import { Paper, List, Container, AppBar, Toolbar, Box, Typography, Button } from '@mui/material';
import AddTodo from './component/AddTodo';
import { call, signout } from './service/ApiService';

function App() {
  const [items, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    call("/todo", "GET", null)
      .then(response => {
        setItem(response.data);
        setLoading(false);
      })
      .catch(() => {
        // console.log("Call failed_from App", err);
        setLoading(true);
      });
  }, []);

  const addItem = (item) => {
    call("/todo", "POST", item)
      .then(response => setItem(response.data));
  };
  console.log("할일 목록 items : ", ...items);

  const delItem = (id) => {
    call("/todo", "DELETE", { id: id })
      .then(response => setItem(response.data));
  };

  const checkItem = (id, done) => {
    const updatedItem = items.find((item) => item.id === id);
    const newItem = { ...updatedItem, done: done };

    // 서버에 상태를 업데이트하는 API 호출
    call("/todo", "PUT", newItem)
      .then(response => {
        // 응답 데이터로 상태를 다시 설정
        setItem(response.data);
      })
      .catch(err => {
        console.log("Update failed: ", err);
      });
    console.log("check : ID-" + id + ", " + done);
  };

  const editItem = (updatedItem) => {
    call("/todo", "PUT", updatedItem)
      .then(response => {
        setItem(response.data);  // 응답 데이터를 상태로 설정
      })
      .catch(err => console.log("Edit failed: ", err));
  };

  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo key={item.id}
            item={item}
            delItem={delItem}
            checkItem={checkItem}
            editItem={editItem} />
        ))}
      </List>
    </Paper>
  );

  let navigaionBar = (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box>
            <Typography variant="h6">오늘의 할일</Typography>
          </Box>
          <Box>
            <Button color="inherit" onClick={signout}>
              로그아웃
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );

  // 로딩 중이 아닐 때 렌더링할 부분
  let todoListPage = (
    <div>
      {navigaionBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );

  // 로딩중일 때 렌더링할 부분
  let loadingPage = <h1>로딩중..</h1>;
  let content = loadingPage;

  if(!loading)
    content = todoListPage;
  
  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;