import { useState } from "react";
import styles from "./App.module.css";

function App() {
    const [name, setName] = useState(""); // input 관리용
    const [cart, setCart] = useState([]); // 목록 관리용

    const handleSubmit = e => {
        e.preventDefault();
        if (name === "" || name === " ") {
            return;
        }
        setCart([...cart, { pName: name, quantity: 1 }]);
        setName("");
    };

    const handleChange = e => {
        setName(e.target.value);
    };

    // 1. 마이너스 button은 클릭하면 onClick에게 제공한 함수가 실행되게 됨
    // 2. 그 함수를 봤더니 () => { handleMinusButton() }, handleMinusButton을 실행
    // 3. 그 때 handleMinusButton에게 지금 순회된 요소가 item에 들어가게 되고, index가 들어가게 됨

    const handleUpdateQuantity = (index, number) => {
        // 기능을 합쳐서 핸들러를 만드는데,
        // '1을 더하고', '1을 빼고' 하는 기능이 아니라 , "수량을 변경하는 함수"로 만듦
        // 얼마를 바꾸느냐는 이 함수를 실행하는 곳에서 결정(매개변수로 전달)
        // if (cart[index].quantity <= 1) {
        //     return;
        // }
        const newCart = [...cart];
        // newCart[index].quantity += 1;
        const nextQuantity = newCart[index].quantity + number;
        // 그렇게 -3 해달라는 명령을 처리했을 때, nextQuantity 가 마이너스 값이면 안 됨
        // 이 조건은 nextQuantity 계산을 한 뒤에 if 처리를 해줘야 함
        if (nextQuantity < 1) {
            return; // nextQuantity를 구하긴 했지만, 업데이트를 안 하고 종료
        }
        newCart[index].quantity = nextQuantity;
        setCart(newCart);
    };

    const handleDeleteButton = index => {
        const result = cart.filter((v, i) => i !== index);
        setCart(result);
    };
    // totalQuantity라는 일반 변수는 값을 저장할 때, 'state' 를 이용하고 있는 중임
    // react는 state의 값이 변하는지를 감시하고 있기에
    // 값이 변하여 재계산을 하는 'react에서의 리렌더링 => 재계산을 하여 브라우저에 코드를 제공하는 일'이라는 과정에 포함됨
    const totalQuantity = cart.reduce((sum, item) => {
        return item.quantity + sum;
    }, 0);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Simple Shop</h2>
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>상품 추가</legend>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type={"text"}
                        placeholder={"상품명을 입력하세요"}
                        value={name}
                        onChange={handleChange}
                    />
                    <button className={styles.submitButton} type={"submit"}>
                        카트에 담기
                    </button>
                </form>
            </fieldset>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td>상품명</td>
                            <td>수량 제어</td>
                            <td>관리</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <td>{item.pName}</td>
                                <td>
                                    <div className={styles.quantityGroup}>
                                        <button
                                            className={styles.qtyButton}
                                            onClick={() => {
                                                handleUpdateQuantity(index, -10);
                                            }}>
                                            -10
                                        </button>
                                        <button
                                            className={styles.qtyButton}
                                            onClick={() => {
                                                handleUpdateQuantity(index, -1);
                                            }}>
                                            -
                                        </button>
                                        <span className={styles.quantityText}>{item.quantity}</span>
                                        <button
                                            className={styles.qtyButton}
                                            onClick={() => {
                                                handleUpdateQuantity(index, +1);
                                            }}>
                                            +
                                        </button>
                                        <button
                                            className={styles.qtyButton}
                                            onClick={() => {
                                                handleUpdateQuantity(index, +10);
                                            }}>
                                            +10
                                        </button>
                                    </div>
                                </td>

                                <td>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDeleteButton(index)}>
                                        ❌ 삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h3 className={styles.summary}>
                총 품목 : {cart.length}개 / 총 수량 : {totalQuantity}개
            </h3>
        </div>
    );
}

export default App;
