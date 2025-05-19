// CALCULATOR
const resultDisplay = document.querySelector('#display');
const memoryDisplay = document.querySelector('#memoryDisplay');
const buttons = document.querySelectorAll('.keyboardCalculator button');

let currentInput = '0';
let previousInput = null;
let operator = null;
let memory = 0;

//Cập nhật kết quả giá trị hiện tại, giá trị bộ nhớ.
function updateDisplay() {
    resultDisplay.textContent = currentInput;
    memoryDisplay.textContent = `Memory: ${memory}`;
}
//Xử lý việc nhập số từ người dùng.
function handleNumberInput(number) {
    if (
        currentInput === '0' ||
        currentInput === 'Infinity' ||
        currentInput === '-Infinity' ||
        isNaN(parseFloat(currentInput))
    ) {
        currentInput = number;
    } else {
        if (currentInput.length >= 27) return;
        currentInput += number;
    }
    updateDisplay();
}
//Xử lý việc nhập dấu thập phân (".").
function handleDecimalInput() {
    //Nếu chưa có dấu "." thì thêm vào currentInput
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}
//Xử lý khi người dùng nhấn nút "C" (Clear).
function handleClearInput() {
    currentInput = '0';
    previousInput = null;
    operator = null;
    updateDisplay();
}
//Xử lý khi người dùng nhấn một trong các nút toán tử (+, -, x, ÷).
function handleOperatorInput(newOperator) {
    //Kiểm tra xem đã nhập một số trước khi chọn một toán tử hay chưa.
    if (currentInput !== '0' && !isNaN(parseFloat(currentInput))) {
        if (previousInput !== null && operator !== null) {
            calculateResult();
        }
        previousInput = currentInput;
        operator = newOperator;
        currentInput = '0';
        updateDisplay();
    } else if (currentInput === '0' && newOperator === '-') {
        currentInput = '-';
        updateDisplay();
    }
}
//Xử lý khi người dùng nhấn nút "=".
function handleEqualsInput() {
    if (
        previousInput !== null &&
        operator !== null &&
        currentInput !== '0' &&
        currentInput !== '-'
    ) {
        calculateResult();
        previousInput = null;
        operator = null;
        updateDisplay();
    }
}
//Thực hiện phép tính dựa trên previousInput, currentInput và operator.
function calculateResult() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (isNaN(num1) || isNaN(num2)) return;

    let result = 0;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case 'x':
            result = num1 * num2;
            break;
        case '÷':
            if (num2 === 0) {
                currentInput = 'Infinity';
                updateDisplay();
                return;
            }
            result = num1 / num2;
            break;
    }

    currentInput = String(result).slice(0, 27);
    updateDisplay();
}
//Xử lý khi người dùng nhấn nút "m+" (cộng giá trị currentInput vào biến memory).
function handleMemoryAdd() {
    if (!isNaN(parseFloat(currentInput))) {
        memory += parseFloat(currentInput);
        updateDisplay();
    }
}
//Xử lý khi người dùng nhấn nút "m-" (trừ giá trị của currentInput khỏi biến memory).
function handleMemorySubtract() {
    if (!isNaN(parseFloat(currentInput))) {
        memory -= parseFloat(currentInput);
        updateDisplay();
    }
}
//Xử lý khi người dùng nhấn nút "mc" (Đặt giá trị của biến memory về 0.).
function handleMemoryClear() {
    memory = 0;
    updateDisplay();
}
//Xử lý sự kiện click các nút bấm trên máy tính.
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonAction = button.dataset.action;
        const buttonText = button.textContent;

        switch (buttonAction) {
            case 'number':
                handleNumberInput(buttonText);
                break;
            case 'decimal':
                handleDecimalInput();
                break;
            case 'clear':
                handleClearInput();
                break;
            case 'operator':
                handleOperatorInput(buttonText);
                break;
            case 'equals':
                handleEqualsInput();
                break;
            case 'memory-add':
                handleMemoryAdd();
                break;
            case 'memory-subtract':
                handleMemorySubtract();
                break;
            case 'memory-clear':
                handleMemoryClear();
                break;
            default:
                break;
        }
    });
});
// CALENDAR
const title = document.querySelector('.calendartitle');
const calendarBody = document.querySelector('.dayCurrentCalendar');
const prevBtn = document.querySelectorAll('.arrowbtn')[0];
const nextBtn = document.querySelectorAll('.arrowbtn')[1];

let currentDate = new Date();
const today = new Date();

function renderCalendar(year, month) {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    title.textContent = `${monthNames[month]} ${year}`;

    calendarBody.innerHTML = '';
    // Thứ mấy của ngày đầu tháng (0:CN, 6: Thứ 7)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    //Số ngày trong tháng (có thể là 28-31)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    //Để thêm ô trống trước khi ngày 1 bắt đầu (chỉnh cho đúng cột)
    const totalCells = firstDayOfMonth + daysInMonth;

    for (let i = 0; i < totalCells; i++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('dayCell');

        if (i < firstDayOfMonth) {
            //Chèn ô rỗng (không có .dayCell) để giữ đúng vị trí thứ.
            calendarBody.appendChild(document.createElement('div'));
            continue;
        } else {
            //Tính số ngày thực tế (bắt đầu từ 1).
            const dayNum = i - firstDayOfMonth + 1;
            dayCell.textContent = dayNum;
            //So sánh ngày hiện tại
            const isToday =
                dayNum === today.getDate() &&
                year === today.getFullYear() &&
                month === today.getMonth();
            if (isToday) {
                dayCell.classList.add('today');
            }
        }
        calendarBody.appendChild(dayCell);
    }
}
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});
nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});
//Khi load trang, hiển thị tháng hiện tại luôn.
renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
