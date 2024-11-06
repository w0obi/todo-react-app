import { API_BASE_URL } from '../component/api-config';

export async function call(api, method, request) {
  let headers = new Headers({
    'content-type': 'application/json',
  });

  // 로컬 스토리지에서 ACCESS_TOKEN 가져오기
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  if (accessToken && accessToken != null) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    // GET method
    options.body = JSON.stringify(request);
  }

  return await fetch(options.url, options)
    .then((response) => {
      console.log('what-err : ' + response);
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 403) {
        window.location.href = '/login';
      } else {
        return Promise.reject(response);
      }
    })
    .catch((error) => {
      console.log('http error: ' + error);
    });
}

export async function signin(userDTO) {
  return await call('/auth/signin', 'POST', userDTO).then((response) => {
    console.log('response : ' + response);
    alert('로그인 완료 : ' + response.token);
    if (response.token) {
      // 로컬 스토레지에 토큰을 저장
      localStorage.setItem('ACCESS_TOKEN', response.token);
      // 화면을 리디렉트(토큰이 있으면)
      window.location.href = '/';
    }
  });
}

export async function signout() {
  await localStorage.removeItem('ACCESS_TOKEN');
  window.location.href = '/login';
}

export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO)
}