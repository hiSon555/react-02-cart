import {useState} from "react";

function App() {
    const [name, setName] = useState("");   // input 관리용
    const [cart, setCart] = useState([]);   // 목록 관리용

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === "" || name === " ") {
            return;
        }
        setCart([...cart, {pName: name, quantity: 1}]);
        setName("")
    }

    const handleChange = (e) => {
        setName(e.target.value);
    }

    // 1. 마이너스 button은 클릭하면 onClick에게 제공한 함수가 실행되게 됨
    // 2. 그 함수를 봤더니 () => { handleMinusButton() }, handleMinusButton을 실행
    // 3. 그 때 handleMinusButton에게 지금 순회된 요소가 item에 들어가게 되고, index가 들어가게 됨
    const handleMinusButton = (item, index) => {
        if (item.quantity <= 1) {
            return;
        }
        const newCart = [...cart];
        newCart[index].quantity -= 1;
        setCart(newCart);
    }

    const handlePlusButton = (index) => {
        const newCart = [...cart];
        newCart[index].quantity += 1;
        setCart(newCart);
    }

    const handleDeleteButton = (index) => {
        const result = cart.filter((v, i) => i !== index);
        setCart(result);
    }
    // totalQuantity라는 일반 변수는 값을 저장할 때, 'state' 를 이용하고 있는 중임
    // react는 state의 값이 변하는지를 감시하고 있기에
    // 값이 변하여 재계산을 하는 'react에서의 리렌더링 => 재계산을 하여 브라우저에 코드를 제공하는 일'이라는 과정에 포함됨
    const totalQuantity = cart.reduce((sum, item) => {
        return item.quantity + sum
    }, 0)

    return (
        <>
            <h2>Simple Shop</h2>
            <fieldset>
                <legend>상품 추가</legend>
                <form onSubmit={handleSubmit}>
                    <input type={"text"}
                           placeholder={"상품명을 입력하세요"}
                           value={name}
                           onChange={handleChange}/>
                    <button type={"submit"}>카트에 담기</button>
                </form>
            </fieldset>
            <table border={1}
                   cellPadding={10}
                   style={{
                       width: "100%",
                       borderCollapse: "collapse",
                   }}>
                <thead style={{backgroundColor: "#f2f2f2"}}>
                <tr>
                    <td>상품명</td>
                    <td>수량 제어</td>
                    <td>관리</td>
                </tr>
                </thead>
                <tbody>
                {cart.map((item, index) => <tr key={index}>
                    <td>{item.pName}</td>
                    <td>
                        <button onClick={() => {
                            handleMinusButton(item, index)
                        }}>-
                        </button>
                        {item.quantity}
                        <button onClick={() => {
                            handlePlusButton(index);
                        }}>+
                        </button>
                    </td>
                    <td>
                        <button onClick={() => handleDeleteButton(index)}>❌ 삭제</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <h3>총 품목 : {cart.length}개 / 총 수량 : {totalQuantity}개</h3>
        </>
    );
}

export default App;