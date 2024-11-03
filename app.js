const exercises = {
    胸部: ['槓鈴胸推', '機械胸推', '機械上胸推', '機械下胸推', '啞鈴胸推', '啞鈴上胸推','啞鈴下胸推' ,'機械夾胸', '伏地挺身'],
    背部: ['機械引體向上', '啞鈴划船', '硬舉', '滑輪下拉', '滑輪水平拉', '機械下拉', '機械水平拉', '槓鈴硬舉', '機械引體向上' ],
    腿部: ['槓鈴深蹲', '機械腿推', '啞鈴分腿蹲'],
    肩部: ['槓鈴肩推', '啞鈴肩推', '機械肩推(斜)', '機械肩推(直)', '啞鈴側飛鳥', '啞鈴後飛鳥', '啞鈴前平舉', '機械後飛鳥', 'cable側飛鳥', '彈力帶飛鳥'],
    手臂: ['機械二頭彎舉', '啞鈴二頭彎舉'],
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
        const response = await fetch('https://script.google.com/macros/s/AKfycbzxmLvjRIlZyCYAYtLwZAfywOY4i-pQ4mxjcS9oLXQtdZ4ByNjAEnkiQPth3UC5W3L4gg/exec', {
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
