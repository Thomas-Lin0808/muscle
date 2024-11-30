// 頁籤切換功能
function openTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
}


//健身
const exercises = {
    胸部: ['槓鈴胸推', '機械胸推', '機械上胸推', '機械下胸推', '啞鈴胸推', '啞鈴上胸推','啞鈴下胸推' ,'機械夾胸', '伏地挺身'],
    背部: ['機械引體向上', '啞鈴划船', '硬舉', '滑輪下拉', '滑輪水平拉', '機械下拉', '機械水平拉', '槓鈴硬舉', '槓鈴划船', '機械引體向上' ],
    腿部: ['槓鈴深蹲', '機械腿推', '啞鈴分腿蹲'],
    肩部: ['槓鈴肩推', '啞鈴肩推', '機械肩推(斜)', '機械肩推(直)', '啞鈴側飛鳥', '啞鈴後飛鳥', '啞鈴前平舉', '機械後飛鳥', '滑輪飛鳥', '彈力帶飛鳥'],
    手臂: ['機械二頭彎舉', '啞鈴二頭彎舉', '機械三頭下壓'],
    核心: ['撐體捲腹', '機械捲腹', '羅馬椅捲腹', '羅馬椅側傾']
};

function updateExerciseList() {
    const bodyPart = document.getElementById('body-part').value;
    const exerciseDropdown = document.getElementById('exercise');
    exerciseDropdown.innerHTML = '';

    exercises[bodyPart].forEach(exercise => {
        const option = document.createElement('option');
        option.value = exercise;
        option.textContent = exercise;
        exerciseDropdown.appendChild(option);
    });
}

// 提交表單並發送資料到後端
document.getElementById('workout-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const bodyPart = document.getElementById('body-part').value;
    const exercise = document.getElementById('exercise').value;
    const weight = document.getElementById('weight').value;
    const reps = document.getElementById('reps').value;
    const sets = document.getElementById('sets').value;

    const workoutData = { bodyPart, exercise, weight, reps, sets };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbz6D0dkVAlzcv_lFpM9_27xKk2tUKhGUGflsylG9L0D3BkKOgYSwERpS4dNyvVXq_e-/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // 使用 URL 編碼格式
            },
            body: new URLSearchParams(workoutData), // 將數據轉換為 URL 編碼格式
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert('健身記錄已成功提交到 Google Sheet！');
        } else {
            alert('提交失敗！');
        }
    } catch (error) {
        alert('發生錯誤，請稍後再試！');
    }
});

//記帳

// 根據類別動態更新項目
function updateItemList() {
    const category = document.getElementById('expense-category').value;
    const itemDropdown = document.getElementById('expense-item');
    itemDropdown.innerHTML = ''; // 清空現有選項

    // 類別對應項目
    const items = {
        收入: ['薪資', '兼職', '其他'],
        飲食: ['早餐', '午餐', '晚餐', '點心', '飲料'],
        交通: ['油錢', '公車', '捷運', '高鐵', '台鐵', '計程車'],
        居住: ['房租', '水費', '電費', '瓦斯費'],
        投資: ['股票', 'ETF', '債券', '基金'],
        醫療: ['藥品', '看診費'],
        娛樂: ['電影', '訂閱費', '遊戲', '3C'],
        進修: ['買書', '考試費', '線上課程'],
        雜支: ['電話費', '保險費', '日用品', '禮物']
    };

    // 檢查是否有對應的類別選項
    if (items[category]) {
        items[category].forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            itemDropdown.appendChild(option); // 添加到下拉選單中
        });
    }
}

function toggleExchangeRate() {
    const foreignCurrencyCheckbox = document.getElementById('foreign-currency');
    const exchangeRateInput = document.getElementById('exchange-rate');

    // 如果勾選外幣，啟用匯率欄位；否則禁用
    if (foreignCurrencyCheckbox.checked) {
        exchangeRateInput.disabled = false;
        exchangeRateInput.required = true; // 勾選後將匯率設為必填
    } else {
        exchangeRateInput.disabled = true;
        exchangeRateInput.required = false; // 未勾選則設為非必填
        exchangeRateInput.value = ''; // 清空匯率欄位的數值
    }
}


document.getElementById('expense-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const category = document.getElementById('expense-category').value;
    const item = document.getElementById('expense-item').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const isForeignCurrency = document.getElementById('foreign-currency').checked;
    const exchangeRate = parseFloat(document.getElementById('exchange-rate').value);
    const notes = document.getElementById('notes').value;

    // 準備備註
    let finalNotes = notes || ''; // 預設備註為空字串

    // 如果勾選了外幣，則將外幣的敘述加到備註前
    if (isForeignCurrency && exchangeRate) {
        if (finalNotes.trim() !== "") {
            finalNotes = `外幣匯率: ${exchangeRate}，` + finalNotes;
        } else {
            finalNotes = `外幣匯率: ${exchangeRate}`;  // 若備註為空，直接加匯率
        }
    }

    const finalAmount = isForeignCurrency ? amount * exchangeRate : amount;
    const accountingData = {  
        category, 
        item, 
        finalAmount, 
        notes: finalNotes
    };

    console.log('提交的資料：', accountingData); // 檢查送出的資料

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzp9MnXK6NDq0GfYWEJij5sSx96wXCVoFFO9uNbzDAhaL4kEk74bZi8cBsoodEpmEO1/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(accountingData),
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert('記帳資料已成功提交到 Google Sheet！');
        } else {
            alert('提交失敗！');
        }
    } catch (error) {
        console.error('發生錯誤：', error); // 檢查錯誤訊息
        alert('發生錯誤，請稍後再試！');
    }
});

//專案
let timerInterval;
let isTiming = false;
let startTime, endTime;

function toggleTimer() {
    const startTimeField = document.getElementById('start-time');
    const endTimeField = document.getElementById('end-time');
    const elapsedTimeField = document.getElementById('elapsed-time');

    if (!isTiming) {
        // 如果已有結束時間，則清空結束時間欄位並停止閃爍
        if (endTimeField.value) {
            endTimeField.value = '';
        }
        elapsedTimeField.style.animation = ''; // 停止閃爍

        // 開始計時
        startTime = new Date();
        startTimeField.value = startTime.toLocaleTimeString();
        elapsedTimeField.value = "00:00:00";
        timerInterval = setInterval(() => updateElapsedTime(startTime, elapsedTimeField), 1000);
        isTiming = true;
    } else {
        // 停止計時
        clearInterval(timerInterval);
        endTime = new Date();
        endTimeField.value = endTime.toLocaleTimeString();
        elapsedTimeField.style.animation = "blink 1s step-end infinite"; // 開始閃爍
        isTiming = false;
    }
}

function updateElapsedTime(startTime, elapsedTimeField) {
    const currentTime = new Date();
    const elapsed = new Date(currentTime - startTime);

    const hours = String(elapsed.getUTCHours()).padStart(2, '0');
    const minutes = String(elapsed.getUTCMinutes()).padStart(2, '0');
    const seconds = String(elapsed.getUTCSeconds()).padStart(2, '0');

    elapsedTimeField.value = `${hours}:${minutes}:${seconds}`;
}


document.getElementById('project-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const projectItem = document.getElementById('project-item').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const elapsedTime = document.getElementById('elapsed-time').value;
    const projectContent = document.getElementById('project-content').value;

    const projectData = { 
        projectItem, 
        projectContent, 
        startTime, 
        endTime, 
        elapsedTime,
        projectContent
    };

    console.log('提交的資料：', projectData); // 檢查送出的資料

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzZ2O1VNKSqf4hZthGAv9lvyQnXx689ulz031mOlmSc8hOeuWL4uoD-n2VfOnqNsslo/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(projectData),
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert('專案資料已成功提交到 Google Sheet！');
        } else {
            alert('提交失敗！');
        }
    } catch (error) {
        alert('發生錯誤，請稍後再試！');
    }
});
