import { Box, Typography, TextField, Button } from "@mui/material";
import { signin } from "../service/ApiService";

function SignUp() {
  const handleSubmit = (e) => {
    // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");

    signin({ username: username, password: password }).then(
      (response) => {
        // 계정 생성 성공시 login으로 리디렉트
        window.location.href = "/login";
      }
    );
  };

  return(
    <Box component="main" maxWidth="xs" sx={{ marginTop: '8%', mx: 'auto' }}>
    <Box sx={{ mb: 2 }}>
      <Typography component="h1" variant="h5">
        SignUp
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
          회원 가입
        </Button>
      </Box>
    </Box>
    <Box justify="flex-end">
      <Box>
        <a href="/login" variant="body2">
          이미 계정이 있습니까? 로그인하세요.
        </a>
      </Box>
    </Box>
  </Box>
  )
}

export default SignUp;