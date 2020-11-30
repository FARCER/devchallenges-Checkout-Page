const counter = function () {
  const counters = document.querySelectorAll('.counter');
  const totalAmount = document.getElementById('total-amount');

  counters.forEach(counter => counter.addEventListener('click', function (e) {
    const target = e.target;
    const valueElement = e.target.closest('.counter').querySelector('.counter__value');
    const currentValue = +valueElement.textContent;
    const priceElement = e.target.closest('.product').querySelector('.product-price__current');
    const priceValue = getValueFromPrice(priceElement);


    if (target.dataset.direction === 'up' || target.parentElement.dataset.direction === 'up') {
      valueElement.textContent = currentValue + 1;
      changeTotalAmount(priceValue, true)
    }
    if (target.dataset.direction === 'down' || target.parentElement.dataset.direction === 'down') {
      if (currentValue - 1 >= 0) {
        valueElement.textContent = currentValue - 1;
        changeTotalAmount(priceValue, false)
      } else {
        valueElement.textContent = 0;
      }
    }
  }))

  function changeTotalAmount(value, isUp = false) {
    const totalAmountValue = getValueFromPrice(totalAmount);

    const resValue = isUp
      ? Number(totalAmountValue + value).toFixed(2)
      : Number(totalAmountValue - value).toFixed(2);

    totalAmount.textContent = `$${resValue}`;
  }

  function getValueFromPrice(price) {
    return +price.textContent.split('$')[1];
  }

};


const submitForm = function () {
  const form = document.forms[0];
  const formBtnSubmit = form.querySelector('.form__submit-btn');
  const formObject = {};
  const formSuccessElement = document.querySelector('.form-success');
  let elements;

  formBtnSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    elements = Array.from(form.elements)

    elements.forEach(el => {
      checkRequiredField(el);
      if (el.id) {
        formObject[el.id] = el.id === 'save'
          ? el.checked
          : el.value
      }
    })
    if (form.checkValidity()) {
      form.remove();
      formSuccessElement.style.display = 'block';
    }
  })


  function checkRequiredField(element) {
    const isRequired = element.required;
    let elementWrapper = element.closest('.form-group');

    if (elementWrapper) {
      if (isRequired && !element.value) {
        elementWrapper.classList.add('error');
      } else if (elementWrapper.classList.contains('error')) {
        elementWrapper.classList.remove('error');
      }
    }
  }
}

counter();
submitForm();
