// inicializa sort
document.querySelectorAll(".sortable th").forEach(headerCell => {
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");

    sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  });
});

// funcs
const getCookie = (key) => {
  let value = ''
  document.cookie.split(';').forEach((e) => {
    if (e.includes(key)) {
      value = e.split('=')[1]
    }
  })
  return value
}
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  // document.cookie = name + "=" + (encodeURIComponent(value) || "")  + expires + "; path=/";
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
const deleteCookie = () => {
  document.cookie = 'filtro=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;'
}
const sortTableByColumn = (table, column, asc = true) => {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  const sortedRows = rows.sort((a, b) => {
    const aColText = a.cells[column].textContent;
    const bColText = b.cells[column].textContent;

    return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
  });

  for (let row of sortedRows) {
    tBody.appendChild(row);
  }

  table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}
const arrayFilter = (value) => {
  const filtro = value.toUpperCase()
  const trimmedData = orgList.filter(itm => Object.keys(itm).some(k => JSON.stringify(itm[k]).includes(filtro)))
  state.querySet = trimmedData
  state.page = 1

  buildTable(state)
}
const pagination = (querySet, page, rows) => {
  const trimStart = (page - 1) * rows
  const trimEnd = trimStart + rows
  const trimmedData = querySet.slice(trimStart, trimEnd)
  const pages = Math.ceil(querySet.length / rows);

  return {
    'querySet': trimmedData,
    'pages': pages,
  }
}
const buildTable = (state) => {
  const table = document.getElementById('table-body')
  const data = pagination(state.querySet, state.page, state.rows)
  const myList = data.querySet
  table.innerHTML = ''

  myList.map(element => {
    // col1
    const row = document.createElement('tr')
    let cell = document.createElement('td')
    cell.classList.add("w-4")
    cell.innerHTML = `<input class="form-check-input m-0 align-middle" type="checkbox" aria-label="Select invoice">`
    row.appendChild(cell)

    // col2
    cell = document.createElement('td')
    cell.innerHTML = `<div class="d-flex align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.NOMUSU}</div>
      </div>
    </div>
    <div class="text-muted">
      <small class="text-reset">Oficina: ${element.DESOFI}</small>
    </div>`
    row.appendChild(cell)

    // col3
    cell = document.createElement('td')
    cell.style.display = 'none'
    cell.value = element.IDUSUA
    row.appendChild(cell)

    table.appendChild(row)
  })

  createPagination(data.pages, state.page)
}
const createPagination = (pages, page) => {
  let str = `<ul>`;
  let active;
  let pageCutLow = page - 1;
  let pageCutHigh = page + 1;

  if (pages === 1) {
    str += `<li class="page-item disabled"><a>Pág</a></li>`;
  }

  if (page > 1) {
    str += `<li class="page-item previous no"><a onclick="onclickPage(${pages}, ${page - 1})">&#9664</a></li>`;
  }

  if (pages < 6) {
    for (let p = 1; p <= pages; p++) {
      active = page === p ? "active" : "no";
      str += `<li class="${active}"><a onclick="onclickPage(${pages}, ${p})">${p}</a></li>`;
    }
  } else {
    if (page > 2) {
      str += `<li class="no page-item"><a onclick="onclickPage(${pages}, 1)">1</a></li>`;
      if (page > 3) {
        str += `<li class="out-of-range"><i>...</i></li>`;
      }
    }

    if (page === 1) {
      pageCutHigh += 2;
    } else if (page === 2) {
      pageCutHigh += 1;
    }
    if (page === pages) {
      pageCutLow -= 2;
    } else if (page === pages - 1) {
      pageCutLow -= 1;
    }
    for (let p = pageCutLow; p <= pageCutHigh; p++) {
      if (p === 0) {
        p += 1;
      }
      if (p > pages) {
        continue
      }
      active = page === p ? "active" : "no";
      str += `<li class="${active}"><a onclick="onclickPage(${pages}, ${p})">${p}</a></li>`;
    }

    if (page < pages - 1) {
      if (page < pages - 2) {
        str += `<li class="out-of-range"><i>...</i></li>`;
      }
      str += `<li class="page-item no"><a onclick="onclickPage(${pages}, ${pages})">${pages}</a></li>`;
    }
  }

  if (page < pages) {
    str += `<li class="page-item next no"><a onclick="onclickPage(${pages}, ${page + 1})">&#9654</a></li>`;
  }
  str += `</ul>`;

  document.getElementById('pagination-wrapper').innerHTML = str;
}
const addUsuarios = () => {
  let arrUsuarios = []

  document.querySelectorAll('input[type=checkbox]').forEach(e => {
    if (e.checked) {
      arrUsuarios.push(e.parentNode.parentNode.cells[2].value)
    }
  })
  document.getElementById('arrusu').value = JSON.stringify(arrUsuarios)
}
const onclickPage = (pages, page) => {
  createPagination(pages, page)
  state.page = page
  buildTable(state)
}