
const generateUserList = (userList=[]) => {
  if (userList.length === 0) {
    const TH = generateTableCell("データはありません");
    TH.setAttribute("colspan", 4);
    return new Array(TH);
  }
  return userList.map(user => {
    const TR = document.createElement("tr");
    TR.appendChild(generateTableCell(user.getId(), "td"));
    TR.appendChild(generateTableCell(user.getName(), "td"));
    TR.appendChild(generateTableCell(user.getBirthday(), "td"));
    TR.appendChild(generateTableCell(user.getHobby().join("、"), "td"));
    return TR;
  });
}

const generateTableCell = (text, tagName="th") => {
  const Cell = document.createElement(tagName);
  Cell.innerText = text;
  if (tagName === "th") {
    Cell.classList.add("text-center", "p-2")
    Cell.setAttribute("scope", "col");
  }
  return Cell;
}

const userDB = new UserDB();
const itemDB = new ItemDB();
new IndexedDB().initDB([userDB.setUpDB(), itemDB.setUpDB()]);

window.addEventListener("DOMContentLoaded", () => {

  const setUserList = () => {
    userDB.selectAll().then((result) => {
      const userListElem = document.getElementById("userList");
      userListElem.innerHTML = "";    
      generateUserList(result.data).forEach(userElem => {
        userListElem.appendChild(userElem);
      });
    }).catch((result) => {
      console.error(result);
    });
  }

  document.getElementById("update-btn").addEventListener("click", () => {
    setUserList();
  });

  document.getElementById("add-btn").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const birthday = document.getElementById("birthday").value;
    const hobby = document.getElementById("hobby").value;
    
    if (name === "" || birthday === "" || hobby === "") {
      alert("未入力の項目があります");
      return;
    }

    const user = new User({ name: name, birthday: birthday, hobby: hobby.split(/[、,]/) });
    userDB.innsert(user.generateRow()).then((response) => {
      alert(response.message);
      setUserList();
      document.getElementById("name").value = "";
      document.getElementById("birthday").value = "";
      document.getElementById("hobby").value = "";
    }).catch((response) => {
      console.error(response.message);
    });
  });

  document.getElementById("remove-btn").addEventListener("click", () => {
    const id = document.getElementById("id").value;
    if (id === "") {
      alert("IDが設定されていません");
      return;
    }

    userDB.deleteById(id).then((response) => {
      alert(response.message);
      setUserList();
    }).catch((response) => {
      console.error(response.message);
    });
  })
  
  setUserList();

});