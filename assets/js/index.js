window.onload = () => {
	app().navbar();
	const MetaContent = document.querySelector('meta[name="description"]').content
	MetaContent == 'home' ? app().words() : '';
	MetaContent == 'info' ? app().info() : '';

}

function app() {
	const content = document.querySelector('.content');
	const DestroyBtn = document.querySelector('#DestroyBtn');
	const app = {
		navbar(){
			const navbar = document.querySelector('.navbar');
			
			template = `
				<div class='navbar-item'>
					<div class='brand'>
						<img src='assets/images/appIcon.svg'/>
						<p>vebbon arşiv</p>
					</div>

					<div class='info' onclick='location.href="info.html"'>
						<img src='assets/images/info.svg' />
					</div>
				</div>
			`
			navbar.innerHTML = '';
			navbar.insertAdjacentHTML('afterbegin', template)
		},
		words(){
			const wordsList = document.querySelector('#words-list');
			const SearchInput = document.querySelector('#SearchInput');
			const SearchBnt = document.querySelector('#search-btn');
			const IndexOneBtn = document.querySelector('#IndexOneBtn');
			const IndexTwoBtn = document.querySelector('#IndexTwoBtn');
			const IndexThreeBtn = document.querySelector('#IndexThreeBtn');

			let wordsIndex = 0;

			function DestroyBtnOn(){
				DestroyBtn.style.display = 'block';
		      DestroyBtn.style.zIndex = '2'
			}

			DestroyBtn.onclick = () => {
				render()
				isActive()
				destroy();
			}

			function destroy(){
				SearchInput.value = '';
				render()
				isActive()
				wordsList.scrollTo(0, 0);
				DestroyBtn.style.display = 'none'
				DestroyBtn.style.zIndex = '-2';
			}

			IndexOneBtn.onclick = () =>{
				wordsIndex = 0
				destroy()
			}

			IndexTwoBtn.onclick = () => {
				wordsIndex = 1
				destroy()
			}

			IndexThreeBtn.onclick = () => {
				wordsIndex = 2
				destroy()
			}

			 function isActive(){
		        if(wordsIndex == 0){
		            IndexOneBtn.classList.add('active')
		            IndexTwoBtn.classList.remove('active')
		            IndexThreeBtn.classList.remove('active')
		        }else if(wordsIndex == 1){
		            IndexTwoBtn.classList.add('active')
		            IndexOneBtn.classList.remove('active')
		            IndexThreeBtn.classList.remove('active')
		        }else if(wordsIndex == 2){
		            IndexThreeBtn.classList.add('active');
		            IndexOneBtn.classList.remove('active')
		            IndexTwoBtn.classList.remove('active')
		           
		        }
		    }
			 function render() {
		        wordsList.innerHTML = ''
		        for(let i = 0; i < words_list[wordsIndex].length; i++){
		            wordsList.insertAdjacentHTML('beforeend', template(words_list[wordsIndex][i], i))
		        }
		        function template(item, index){
		            return `
		                <div class="word-item">
		                    <p class='indexOf'>${index + 1}</p>

		                    <div class="word-box">
		                        <p class='ru'>${item.ru ? item.ru.toLowerCase() : item.ru}</p>
		                        <p class='tm gray'>${item.tm ? item.tm.toLowerCase() : item.tm}</p>
		                    </div>
		                    <div clas='typeWord'>

		                    </div>
		                </div>
		            `
		        }
		    }

		    function search() {

		        let SearchInput = document.querySelector('#SearchInput');
		        let GoSearchBtn = document.querySelector('#search-btn');
		        GoSearchBtn.onclick = function() {
		            render()
		            let value = SearchInput.value.trim().toLowerCase();
		            let list = document.querySelectorAll('#words-list .word-item');
		            if(value != ''){
		                list.forEach(elem => {
		                    if(elem.innerText.search(value) == -1) {
		                        elem.classList.add('removedListItem');
		                    }else{
		                        elem.querySelector('.indexOf').innerText='➤';
		                        elem.querySelector('.indexOf').classList.add('hasSelected');
		                        elem.querySelector('.tm').style.color = '#2c91d3';
		                         DestroyBtnOn();
		                    }  
		                })
		            }else{
		                render()
		                isActive()
		            }
		        }
		    }
		    render()
		    search()
		    isActive()
		},
		info(){

			const ContactList = [
				{degre:'Yazılımcı', value:'vebbon', img:'assets/images/developer.svg', order:'top'},
				{degre:'Gmail', value:'picunad00@gmail.com', img:'assets/images/email.svg'},
				{degre:'Telegram', value:'@vebbon', img:'assets/images/telegram.svg'},

				]

			toHtml = i => `
				<div class="item ${i.order ? i.order : ''}">
               <img src="${i.img}">
               <div class="title">
                  <div class="degre">${i.degre}</div>
                  <div class="value">${i.value}</div>
               </div>
            </div>
			`
			const contactHtml = document.querySelector('#contact');
			contactHtml.insertAdjacentHTML('beforeend', ContactList.map(toHtml).join(''))

			AppInfoList = [
				{param:'App name', setParam:'vebbon arşiv'},
				{param:'Version', setParam:'0.0.1'},
				{param:'Telegram kanal', setParam:'@vebbongiris'}
			]

			AppInfoToHtml = i => `
				<div class='infoItem'>
					<p>${i.param} : <p class='value'> ${i.setParam}</p></p>
				</div>
			`


			const AppInfoHtml = document.querySelector('.info-box');
			AppInfoHtml.innerHTML = AppInfoList.map(AppInfoToHtml).join('')
		}
	}
	return app
}
