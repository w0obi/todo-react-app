import { ListItem, ListItemText, InputBase, Checkbox, Button } from "@mui/material";
import { useState } from "react";

const Todo = (props) => {
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true);

    //읽기전용 비활성화
    const turnOffReadOnly = () => {
        setReadOnly(false);
    };

    //입력필드를 읽기전용으로 설정
    const turnOnReadOnly = (e) => {
        if (e.key === "Enter") {
            setReadOnly(true);
            props.editItem(item);
        }
    }

    //할일 제목 변경
    const editEventHandler = (e) => {
        const updatedItem = { ...item, title: e.target.value };
        setItem(updatedItem);  // 수정된 항목을 부모로 전달
    };

    //할일 삭제
    const onButtonClick = () => {
        props.delItem(item.id);
    };

    //할일 완료
    const onCheck = (e) => {
        props.checkItem(item.id, e.target.checked);
    };

    return (
        <ListItem>
            <Checkbox checked={props.item.done} onChange={onCheck} />
            <ListItemText>
                <InputBase
                    inputProps={{
                        "aria-label": "naked",
                        readOnly: readOnly
                    }}
                    onClick={turnOffReadOnly}
                    onKeyDown={turnOnReadOnly}
                    onChange={editEventHandler}
                    type="text"
                    value={item.title}
                    fullWidth={true} />
            </ListItemText>
            <Button onClick={onButtonClick}>del</Button>
        </ListItem>
    );
}

export default Todo;