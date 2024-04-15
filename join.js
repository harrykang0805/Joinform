//주민번호 앞 6자리 입력시 자동으로 뒷번호로 포커싱

$(document).ready(function () {
    $('#idNumber1').on('input', function () {
      if (this.value.length === 6) {
        $('#idNumber2').focus();
      }
    })
  });


  // 주민번호 뒷자리 *로 암호화처리
  $(document).ready(function () {
    $('#idNumber2').on('input', function () {
      const idNumber2Value = $(this).val();
      const maskedValue = '*'.repeat(idNumber2Value.length);
      $(this).val(maskedValue);
    });
  });

// 이메일 선택시 선택된 이메일 값 넣기
  $('#email3').change(function () {
    $('#email2').val($(this).val());
  });


  // 주소확인버튼 누르면 주소검색창 나오고 입력시 값 넣기
  $(document).ready(function () {
    $('.주소확인버튼').on('click', function (event) {
      event.preventDefault();
      new daum.Postcode({
        oncomplete: function (data) {
          let addr;
          if (data.userSelectedType === 'R') {
            addr = data.roadAddress;
          } else {
            addr = data.jibunAddress;
          }
          $('#address1').val(addr); // 수정된 부분
          $('#post').val(data.zonecode); // 수정된 부분
          $('#address2').focus();
        },
      }).open();
    });
  });


  // 휴대전화 번호 입력시 하이픈 자동생성
  $(document).ready(function () {
    $('#phone').on('input', function () {
      let input = $(this).val();
      input = input.replace(/[^0-9]/g, ''); // 숫자만 남기기
      let formatted = '';
      if (input.length > 0) {
        formatted += input.substr(0, 3);
      }
      if (input.length > 3) {
        formatted += '-' + input.substr(3, 4);
      }
      if (input.length > 7) {
        formatted += '-' + input.substr(7);
      }
      $(this).val(formatted);
    });
  });

  function validateForm() {
    let id = $('#id').val();
    let password = $('#password').val();
    let passwordConfirm = $('#passwordConfirm').val();
    let email = $('#email1').val() + $('#email2').val();
    let post = $('#post').val();

    if (id.length < 4) {
      alert('아이디는 4자 이상');
      return false;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호 입력이 일치하지 않음');
      return false;
    }

    if (!isValidEamil(email)) {
      alert('유효한 이메일 주소 입력');
      return false;
    }

    if (!isValidPostcode(post)) {
      alert('유효한 우편번호를 입력해주세요. (예: 12345-678)');
      return false;
    }
    return true;

  }

  function isValidEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  function isValidPostcode(postcode) {
    const postcodeRegex = /^\d{5}$/;
    return postcodeRegex.test(postcode);
  };
