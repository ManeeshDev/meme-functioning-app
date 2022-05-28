(() => {

  window.onload = (event) => {
    goToSleep();
    addCrushes();
    showInfo();
    runServiceWorker();
    /*  this element come from server banner */
    if (document.querySelector('.disclaimer')) {
      document.querySelector('.disclaimer').remove();
    }
  };

  const runServiceWorker = () => {
    /* For: Progressive Web App  */
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
        .then(reg => {
          reg.update();
        }).catch(err => {
          alert('SERVICE WORKER REGISTRATION FAIL: see err msg in console');
          console.log('SERVICE WORKER REGISTRATION FAIL:', err);
        });
    }
  }

  const showInfo = () => {
    document.querySelector('#info').addEventListener('click', () => {
      Swal.fire({
        title: 'This is a Meme Functioning <br>Small App',
        html:
          "<small>This will input your data and crush's data, then compare their age's with your age by gender.<br>" +
          "<small><i>{ If Male: myAge >= crushAge | If Female: myAge <= crushAge }</i></small><br>" +
          "And the app set the 'crush-like' for every crush randomly,<br>So if there has at least one 'like' then the meme started.<br>" +
          "If all likes are false It tries recursively 3 times.<br>" +
          "<small><b>: <u>This app doesn't save your details anywhere.</u></b></small></small>",
        showCancelButton: false,
        confirmButtonText: 'Just Fun😎',
      });
    });
  }

  const goToSleep = () => {
    const button = document.querySelector('#btnGoSleep');
    button.addEventListener('click', () => {
      checkData();
    });
  }

  const checkData = () => {
    let data;
    const name = document.querySelector("#name").value;
    const age = document.querySelector("#age").value;
    const gender = document.querySelector("#gender").value;

    if (!name || !age || !gender) {
      Swal.fire({
        type: 'info',
        title: 'Please enter at least your data🙄',
        html:
          'Data දාන්නේ නැත්නම් defaults වලින් බලන්න😏<br>' +
          '<small><b>- Defaults -</b><br>' +
          'Your details: Name, 23, Male <br>' +
          'With 3 crushes: {Crush1, 29}, {Crush2, 23}, {Crush3, 20})</small>',
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: 'Add data',
        cancelButtonText: 'Run defaults'
      }).then((result) => {
        if (result.value) {
          return false;
        } else {
          data = setData(name, age, gender);
          if (data && data.length > 0) {
            memeFunctioning(data);
          } else {
            window.location.reload();
          }
        }
      });
    } else {
      data = setData(name, age, gender);
      if (data && data.length > 0) {
        memeFunctioning(data);
      } else {
        window.location.reload();
      }
    }
  }

  const setData = (name, age, gender) => {
    let crushes = [];
    const me = {
      name: name ? name : "Name",
      age: age ? age : 23,
      like: true,
      gender: gender ? gender : "male"
    };
    if (document.getElementsByClassName("crushName").length) {
      let elements = document.getElementsByClassName("crushName");
      Array.from(elements).forEach((element) => {
        crushes.push({
          name: element.querySelector("#crushName").value,
          age: element.querySelector("#crushAge").value
        });
      });
    } else {
      crushes = [
        { name: "Crush1", age: 29 },
        { name: "Crush2", age: 23 },
        { name: "Crush3", age: 20 },
        { name: "Crush4", age: 18 },
      ];
    }
    return (me != {}) && (crushes.length > 0) ? [me, crushes] : [];
  }

  const addCrushes = (event) => {
    document.querySelector("#addCrush").addEventListener("click", (e) => {
      let count = document.getElementsByClassName("crushName").length + 1;
      let html = `<div class="form-common crushName"  id="crush-${count}">
                  <input class="form-control" type="text" id="crushName" placeholder="Enter your crush">
                  <div class="d-flex" >
                    <input class="form-control" type="number" id="crushAge" placeholder="Enter your crush age">
                    <span class="form-control remove-crush" data-id="${count}" >X</span>
                  </div>
                </div>`;
      document.querySelector("#crushList").insertAdjacentHTML("beforeend", html);
      removeCrush();
    });
  }

  const removeCrush = (event) => {
    let elements = document.getElementsByClassName("remove-crush");
    Array.from(elements).forEach((element) => {
      element.addEventListener("click", (e) => {
        document.getElementById("crush-" + element.getAttribute("data-id")).remove();
      });
    });
  }

  const startDreamVisualizer = (event) => {
    document.querySelector('#mFrom').style.display = "none";
    setTimeout(() => {
      document.querySelector('#say01Img').style.display = "block";
    }, 1000);
    setTimeout(() => {
      document.querySelector('#say01Img').style.display = "none";
      document.querySelector('#say02Img').style.display = "block";
    }, 2500);
    setTimeout(() => {
      document.querySelector('#say02Img').style.display = "none";
      document.querySelector('#meImg').style.display = "block";
    }, 4000);
    setTimeout(() => {
      document.querySelector('#meImg').style.display = "none";
      document.querySelector('#crushImg').style.display = "block";
    }, 5500);
    setTimeout(() => {
      document.querySelector('#crushImg').style.display = "none";
      document.querySelector('#alarmPicImg').style.display = "block";
    }, 7000);
  }

  const alarmTone = [
    'https://play.ringtonesfree.mobi/202005/fantasy-alarm-clock-4569.mp3',
    'https://play.ringtonesfree.mobi/202003/alarm-army-2526.mp3',
    'https://play.ringtonesfree.mobi/202005/alarm-loving-you.mp3',
    'https://play.ringtonesfree.mobi/202003/best-wake-up-sound-2086.mp3',
  ];
  let dreams = [];
  let count = 0;

  const getRandomTone = () => alarmTone[Math.floor(Math.random() * alarmTone.length)];

  const getDream = (crush) => ({ crush: crush, dream: [], crushLike: Math.round(Math.random() % 2), blank: false });

  const blank = () => ({ blank: true });

  const continueSleep = (count, data, word = ['ගැලපෙන', '']) => {
    if (count <= 3) {
      memeFunctioning(data);
    } else {
      Swal.fire({
        type: 'info',
        title: 'Continuous Sleep....🥰',
        text: 'උබට ' + word[0] + ' එකක් නෑ මෙතන' + word[1] + '\n😢😐',
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: 'Home',
        cancelButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          window.location.reload();
        }
      });
    }
  };

  const ringAlarm = (myName, name) => {
    let audio = new Audio(getRandomTone());
    audio.load();
    audio.play().then(r => {
      setTimeout(() => {
        Swal.fire({
          title: 'නැගිටපන් භල්ලෝ...\n😂😂😂',
          html:
            'හීන දැක්ක ඇති නැගිටපන්...\n😁<br>' +
            'හැබැයි එක්කෙනෙක් කැමති උනා <b>හීනෙන්</b> 😇🙃<br>' +
            '<small>මෙයා: <b> ' + name + '</b>😍😋</small><br>' +
            '<br><b> ' + myName + ' ❤ ' + name + '</b>',
          type: 'warning',
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonText: 'Stop Alarm',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
            audio.pause();
          } else {
            audio.play();
          }
          document.querySelector('#alarmPicImg').style.display = "none";
          document.querySelector('#postImg').style.display = "block";
          document.querySelector('#mFromBack').style.display = "block";
        });
      }, 3000);
    });
  };

  const memeFunctioning = (data) => {
    if (data) {
      const [me, crushes] = data;

      if (me.gender === 'male') {
        crushes.forEach(c => c.age <= me.age ? dreams.push(getDream(c)) : dreams.push(blank()));
      } else if (me.gender === 'female') {
        crushes.forEach(c => c.age >= me.age ? dreams.push(getDream(c)) : dreams.push(blank()));
      }

      if (dreams.every(d => d.blank === true)) {
        continueSleep(++count, data, ['ගැලපෙන', '(වයස වැඩී)']);
      } else {
        if (dreams.some(d => d.crushLike === 1)) {
          let i = 1;
          dreams.find(d => {
            if (d.crushLike === 1) {
              startDreamVisualizer();
              setTimeout(() => ringAlarm(me.name, d.crush.name), 6900);
              return true;
            }
          });
        } else {
          continueSleep(++count, data, ['කැමති', ' (random unlike)']);
        }
      }
    }
  }

})();
