import {isValidForm} from './utils.js';

const pageId = document.body.id;

const statisticsData = JSON.parse(localStorage.getItem('statisticsData')) || [];


if (pageId === 'statisticsPage') {

    document.getElementById('open-burger').addEventListener('click', () => {
        console.log('work');
        const dashboard = document.getElementById('dashboard');
        dashboard.classList.toggle('open__dashboard');
    })

    const mainContent = document.querySelector('.mainContent');
    mainContent.style.backgroundColor = '#eaf0f6';

    document.body.style.backgroundColor = '#eaf0f6';

    const animatedProfile = document.getElementById('animatedProfile');
    setTimeout(() => {
        animatedProfile.classList.add('visible');
    }, 750);

    const progressBars = document.getElementById('progressBars');

    const addStatistics = document.getElementById('add__statistics');
    const modal = document.getElementById('modalBackdrop');
    const closeModal = document.querySelector('.close-modal');

    addStatistics.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.getElementById('saveStatistics').addEventListener('click', () => {
        const title = document.getElementById('titleInput').value;
        const currentValue = parseFloat(document.getElementById('currentValueInput').value);
        const necessaryValue = parseFloat(document.getElementById('necessaryValueInput').value);

        if (!title || isNaN(currentValue) || isNaN(necessaryValue)) {
            alert('Заполните все поля корректными значениями!');
            return;
        }

        const storedData = localStorage.getItem('statisticsData');
        let statisticsArray = storedData ? JSON.parse(storedData) : [];

        const newStatistic = {
            title: title,
            currentValue: currentValue,
            necessaryValue: necessaryValue
        };

        statisticsArray.push(newStatistic);

        localStorage.setItem('statisticsData', JSON.stringify(statisticsArray));

        document.getElementById('titleInput').value = '';
        document.getElementById('currentValueInput').value = '';
        document.getElementById('necessaryValueInput').value = '';
        modal.style.display = 'none';

        window.location.href = location.href;
    });

    if (!statisticsData || statisticsData.length === 0) {
        progressBars.textContent = 'Нет отслеживаемой статистики';
    } else {
        statisticsData.forEach((data) => {
            const block = document.createElement('div');
            block.classList.add('progress-container');


            const cross = document.createElement('img');
            cross.classList.add('delete__statistics-img');
            cross.setAttribute('alt', 'delete');
            cross.setAttribute('src', 'img/cross.svg');

            const crossButton = document.createElement('button');
            crossButton.classList.add('delete__statistics');

            const title = document.createElement('h2');
            title.textContent = data.title;
            title.classList.add('progress-container__title');

            const subTitle = document.createElement('p');
            subTitle.textContent = `${data.currentValue} / ${data.necessaryValue}`;
            subTitle.classList.add('progress-container__subTitle');

            const buttonBlock = document.createElement('div');
            buttonBlock.classList.add('buttonBlock');

            const minusButton = document.createElement('button');
            minusButton.textContent = 'Убавить';
            minusButton.setAttribute('id', 'minusButton');

            const plusButton = document.createElement('button');
            plusButton.textContent = 'Добавить';
            plusButton.setAttribute('id', 'plusButton');

            const inputNumber = document.createElement('input');
            inputNumber.placeholder = 'Введите число';
            inputNumber.setAttribute('id', 'inputNumber');
            inputNumber.setAttribute('type', 'number');

            const checkboxInner = document.createElement('div');
            checkboxInner.classList.add('checkboxInner');

            const checkboxContainerAnimated = document.createElement('div');
            checkboxContainerAnimated.classList.add('checkboxContainer');
            checkboxContainerAnimated.classList.add('checkboxContainerAnimated');

            const checkboxContainerHidden = document.createElement('div');
            checkboxContainerHidden.classList.add('checkboxContainer');

            const checkboxLabelAnimated = document.createElement('label');
            checkboxLabelAnimated.classList.add('switch');
            checkboxLabelAnimated.setAttribute('htmlFor', 'checkbox');

            const checkboxLabelHidden = document.createElement('label');
            checkboxLabelHidden.classList.add('switch');
            checkboxLabelHidden.setAttribute('htmlFor', 'checkbox');

            const checkboxInputAnimated = document.createElement('input');
            checkboxInputAnimated.setAttribute('type', 'checkbox');
            checkboxInputAnimated.setAttribute('id', 'checkbox');

            const checkboxInputHidden = document.createElement('input');
            checkboxInputHidden.setAttribute('type', 'checkbox');
            checkboxInputHidden.setAttribute('id', 'checkboxHidden');

            const checkboxDivAnimated = document.createElement('div');
            checkboxDivAnimated.classList.add('slider');
            checkboxDivAnimated.classList.add('round');

            const checkboxDivHidden = document.createElement('div');
            checkboxDivHidden.classList.add('slider');
            checkboxDivHidden.classList.add('round');

            const checkBoxTextAnimated = document.createElement('label');
            checkBoxTextAnimated.classList.add('checkBox__text');
            checkBoxTextAnimated.textContent = 'Animated';

            const checkBoxTextHidden = document.createElement('label');
            checkBoxTextHidden.classList.add('checkBox__text');
            checkBoxTextHidden.textContent = 'Hidden';

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.classList.add('progress-svg');
            svg.setAttribute('viewBox', '0 0 100 100');

            const progressBg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            progressBg.classList.add('progress-bg');
            progressBg.setAttribute('cx', '50');
            progressBg.setAttribute('cy', '50');
            progressBg.setAttribute('r', '20');

            const progressBar = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            progressBar.classList.add('progress-bar');
            progressBar.setAttribute('cx', '50');
            progressBar.setAttribute('cy', '50');
            progressBar.setAttribute('r', '20');

            const progressText = document.createElement('div');
            progressText.classList.add('progress-text');

            const saveToLocalStorage = () => {
                localStorage.setItem('statisticsData', JSON.stringify(statisticsData));
            };

            const deleteFromLocalStorage = (title) => {
                let statisticsData = JSON.parse(localStorage.getItem('statisticsData')) || [];
                statisticsData = statisticsData.filter(item => item.title !== title);
                localStorage.setItem('statisticsData', JSON.stringify(statisticsData));
                window.location.reload();
            };

            crossButton.addEventListener('click', () => {
                deleteFromLocalStorage(data.title);
            });

            const updateProgress = () => {
                const progress = Math.min(Math.max(Math.floor((data.currentValue / data.necessaryValue) * 100), 0), 100);
                progressText.textContent = `${progress}%`;
                subTitle.textContent = `${data.currentValue} / ${data.necessaryValue}`;
                const offset = 283 - Math.floor(125 / 100 * progress);
                progressBar.style.strokeDashoffset = String(offset);
                inputNumber.value = data.currentValue;
            };

            minusButton.addEventListener('click', () => {
                if (data.currentValue > 0) {
                    data.currentValue -= 1;
                    updateProgress();
                    saveToLocalStorage();
                }
            });


            plusButton.addEventListener('click', () => {
                if (data.currentValue < data.necessaryValue) {
                    data.currentValue += 1;
                    updateProgress();
                    saveToLocalStorage();
                }
            });

            inputNumber.addEventListener('input', (e) => {
                const inputValue = e.target.value;

                if (inputValue === '') {
                    data.currentValue = 0;
                    updateProgress();
                    saveToLocalStorage();
                } else {
                    const newValue = parseInt(inputValue, 10);
                    if (!isNaN(newValue) && newValue >= 0 && newValue <= data.necessaryValue) {
                        data.currentValue = newValue;
                        updateProgress();
                        saveToLocalStorage();
                    } else {
                        e.target.value = data.currentValue;
                    }
                }
            });

            checkboxContainerAnimated.addEventListener('change', (e) => {
                const isChecked = e.target.checked;

                const animatedBlock = block.querySelector('.progress-svg');

                if (isChecked) {
                    animatedBlock.classList.remove('animated');
                    void animatedBlock.offsetWidth;
                    animatedBlock.classList.add('animated');
                } else {
                    animatedBlock.classList.remove('animated');
                }
            });

            checkboxContainerHidden.addEventListener('change', (e) => {
                const isChecked = e.target.checked;

                const title = block.querySelector('.progress-container__title');
                const subTitle = block.querySelector('.progress-container__subTitle');
                const buttonBlock = block.querySelector('.buttonBlock');
                const checkboxContainerAnimated = block.querySelector('.checkboxContainerAnimated');
                const progressSvg = block.querySelector('.progress-svg');
                const progressText = block.querySelector('.progress-text');

                const opacityValue = isChecked ? '0' : '1';

                title.style.opacity = opacityValue;
                subTitle.style.opacity = opacityValue;
                buttonBlock.style.opacity = opacityValue;
                checkboxContainerAnimated.style.opacity = opacityValue;
                progressSvg.style.opacity = opacityValue;
                progressText.style.opacity = opacityValue;
            });

            updateProgress();

            crossButton.appendChild(cross);

            checkboxLabelAnimated.appendChild(checkboxInputAnimated);
            checkboxLabelAnimated.appendChild(checkboxDivAnimated);
            checkboxLabelHidden.appendChild(checkboxInputHidden);
            checkboxLabelHidden.appendChild(checkboxDivHidden);

            svg.appendChild(progressBg);
            svg.appendChild(progressBar);

            buttonBlock.appendChild(minusButton);
            buttonBlock.appendChild(inputNumber);
            buttonBlock.appendChild(plusButton);

            checkboxContainerAnimated.appendChild(checkboxLabelAnimated);
            checkboxContainerAnimated.appendChild(checkBoxTextAnimated);
            checkboxContainerHidden.appendChild(checkboxLabelHidden);
            checkboxContainerHidden.appendChild(checkBoxTextHidden);


            checkboxInner.appendChild(checkboxContainerAnimated);
            checkboxInner.appendChild(checkboxContainerHidden);

            block.appendChild(crossButton);
            block.appendChild(title);
            block.appendChild(subTitle);
            block.appendChild(buttonBlock);
            block.appendChild(checkboxInner);
            block.appendChild(svg);
            block.appendChild(progressText);
            progressBars.appendChild(block);
        });
    }
}

