// 1️⃣ DOM 元素
const incomeForm = document.getElementById('income-form');
const salaryInput = document.getElementById('salary');
const parttimeInput = document.getElementById('parttime');
const investmentInput = document.getElementById('investment');
const otherInput = document.getElementById('other');

// 2️⃣ 記帳資料儲存陣列
const transactions = [];

// 3️⃣ 監聽收入表單送出事件
incomeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const salary = parseFloat(salaryInput.value) || 0;
  const parttime = parseFloat(parttimeInput.value) || 0;
  const investment = parseFloat(investmentInput.value) || 0;
  const other = parseFloat(otherInput.value) || 0;

  if (salary === 0 && parttime === 0 && investment === 0 && other === 0) {
    alert('請至少輸入一筆收入金額');
    return;
  }

  // 新增每筆有效的收入分類
  if (salary > 0) transactions.push({ type: 'income', category: '薪資', amount: salary });
  if (parttime > 0) transactions.push({ type: 'income', category: '兼職', amount: parttime });
  if (investment > 0) transactions.push({ type: 'income', category: '投資收益', amount: investment });
  if (other > 0) transactions.push({ type: 'income', category: '其他', amount: other });

  // 清空表單
  incomeForm.reset();

  // 更新報表
  updateIncomeChart();
});

// 4️⃣ 計算收入分類加總
function calculateIncomeSummary() {
  const summary = {};

  transactions.forEach(tx => {
    if (tx.type === 'income') {
      if (!summary[tx.category]) {
        summary[tx.category] = 0;
      }
      summary[tx.category] += tx.amount;
    }
  });

  return summary;
}

// 5️⃣ 繪製收入圓餅圖
let incomeChart;

function updateIncomeChart() {
  const ctx = document.getElementById('incomeChart');
  if (!ctx) return;

  const incomeSummary = calculateIncomeSummary();
  const labels = Object.keys(incomeSummary);
  const data = Object.values(incomeSummary);

  const config = {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          '#ffb6b9',
          '#cdb4db',
          '#ffdac1',
          '#a2d2ff'
        ]
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  };

  if (incomeChart) {
    incomeChart.destroy();
  }

  incomeChart = new Chart(ctx, config);
}

// 6️⃣ 頁面載入時初始化空圖
window.addEventListener('DOMContentLoaded', () => {
  updateIncomeChart();
});
