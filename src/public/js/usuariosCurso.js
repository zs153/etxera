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
    cell.innerHTML = `<div class="align-items-center">
      <span class="avatar avatar-rounded bg-green-lt">
        <h6>${element.USERID}</h6>
      </span>
    </div>`
    row.appendChild(cell)
    // col2
    cell = document.createElement('td')
    cell.innerHTML = `<div class="d-flex align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.NOMUSU}</div>
      </div>
    </div>`
    row.appendChild(cell)
    // col2
    cell = document.createElement('td')
    cell.classList.add("w-4")
    cell.innerHTML = `<ul class="dots-menu">
      <li class="nav-item drop-right">
        <a href="#" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke-width="1" fill="none" d="M12 18.7q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687.288-.288.688-.288.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.688.288-.287.688-.287.4 0 .688.287.287.288.287.688 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687Q11.6 5.3 12 5.3q.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Z"/>
          </svg>
        </a>
        <ul>
          <li class="nav-item">
            <a href="#" class="nav-link" onclick="{document.getElementById('idusua').value ='${element.IDUSUA}', document.getElementById('msgbor').innerHTML ='<p>${element.NOMUSU}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-borrar">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke-width=".4" fill="none" d="M7.85 19.575q-.6 0-1.025-.425-.425-.425-.425-1.025v-12.1h-.975V5.4h3.6v-.675H15V5.4h3.6v.625h-.975V18.15q0 .6-.425 1.013-.425.412-1.025.412Zm9.125-13.55H7.05v12.1q0 .35.225.575.225.225.575.225h8.325q.3 0 .55-.25.25-.25.25-.55Zm-6.85 10.925h.625V8h-.625Zm3.15 0h.625V8h-.625ZM7.05 6.025V18.925 18.125Z"/>
              </svg>
              Borrar
            </a>
          </li>
          <li></li>
        </ul>
      </li>
    </ul>`
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
      arrUsuarios.push(e.parentNode.parentNode.cells[3].value)
    }
  })
  document.getElementById('arrusu').value = JSON.stringify(arrUsuarios)
}
const onclickPage = (pages, page) => {
  createPagination(pages, page)
  state.page = page
  buildTable(state)
}