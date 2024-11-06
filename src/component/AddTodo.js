import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

const AddTodo = (props) => {
    const [item, setItem] = useState({ title: "" });

    // 할일 제목이 바뀔 때마다 상태 업데이트
    const onInputChange = (e) => {
        setItem({ title: e.target.value });
    };

    // 버튼 클릭 시 할 일 추가 함수 호출
    const onButtonClick = () => {
        props.addItem(item); // 부모 컴포넌트에서 addItem 함수 사용
        setItem({ title: "" }); // 입력 필드 초기화
    };

    const enterKeyEventHandler = (e) => {
        if(e.key === "Enter") {
            onButtonClick();
        }
    };

    return (
        <Box display="flex" alignItems="center" style={{ marginTop: 20 }}>
            <Box flexGrow={8} mr={2}>
                <TextField 
                    label="Add Todo here"
                    fullWidth
                    variant="outlined" 
                    value={item.title}
                    onChange={onInputChange}
                    onKeyDown={enterKeyEventHandler}
                />
            </Box>
            <Box flexGrow={2}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    style={{padding: '15px'}}
                    onClick={onButtonClick}
                >
                    Add
                </Button>
            </Box>
        </Box>
    );
};

export default AddTodo;
