var jisho = [];
var yougo = 'N5';
var iro = '';

const kannjiDisplay = document.getElementById('kannjiDisplay');
const btn_kennsaku = document.getElementById('btn_kennsaku');

async function loadKanjiTable() {
	kannjiDisplay.innerHTML = '';
	if (yougo == '') return;

	jisho.forEach( k => {
		iro = '';
		switch (k.reberu) {
			case 'N5':
				iro = 'info';
				break;
			case 'N4':
				iro = 'primary';
				break;
			case 'N3':
				iro = 'success';
				break;
			case 'N2':
				iro = 'warning';
				break;
			case 'N1':
				iro = 'danger';
				break;
			default:
				iro = 'secondary';
		}
		if (k.kannji.toLowerCase().includes(yougo) || k.yomikata.toLowerCase().includes(yougo) || k.imi.toLowerCase().includes(yougo) || k.reberu == yougo)
			kannjiDisplay.innerHTML += 
				`
				<div class="col-3" style="margin-top: 25px;">
					<div class="card">
						<div class="card-body">
							<h1 class="card-title kannjiTitle">${k.kannji}</h1>
							<p class="card-text"> <span class="badge bg-dark">読み方</span> ${k.yomikata}</p>
							<p class="card-text"> <span class="badge bg-primary">意味</span> ${k.imi}</p>
							<p class="card-text"> <span class="badge bg-${iro}">レベル</span> ${k.reberu ?? "-"}</p>
							<p class="card-text"> <span class="badge bg-success">共通</span> ${k.kyoutsuu ? "はい" : "いいえ"}</p>
						</div>
					</div>
				</div>
				`;
	});
	
}

window.onload = async function() {
	await fetch('../json/jisho.json').then(str => str.json()).then( jsonData => {jisho = jsonData;});
	loadKanjiTable();
	console.log('完了です！');
};

btn_kennsaku.addEventListener('click', function() {
	console.log(document.getElementById('txt_yougo').value);
	yougo = document.getElementById('txt_yougo').value.toLowerCase().trim();
	loadKanjiTable();
});

function setReberu(reberuInput) {
	yougo = reberuInput;
	loadKanjiTable();
}