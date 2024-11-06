import React from 'react'
import { Box, Typography, TextField, Button } from "@mui/material";
import { signin } from '../service/ApiService';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");

    signin({ username: username, password: password });
  }

  return (
    <Box component="main" maxWidth="xs" sx={{ marginTop: "8%", mx: "auto" }}>
      <Box sx={{ mb: 2 }}>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
      </Box>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="username"
            label="아이디"
            name="username"
            autoComplete="username"
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="패스워드"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Box>
        <Box>
          <Button type="submit" fullWidth variant="contained" color="primary">
            로그인
          </Button>
        </Box>
        <Box>
          <a href='/signup' variant="body2">계정이 없습니까? 여기서 가입하세요.</a>
        </Box>
      </Box>
    </Box>
  )
}
export default Login;