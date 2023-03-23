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
        <h6>${element.IDCURS}</h6>
      </span>
    </div>`
    row.appendChild(cell)
    // col2
    cell = document.createElement('td')
    cell.innerHTML = `<div class="d-flex align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.DESCUR}</div>
      </div>
    </div>`
    row.appendChild(cell)
    // col3
    cell = document.createElement('td')
    cell.classList.add("w-9")
    cell.innerHTML = `<div class="d-flex align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${estados[element.STACUR].des} </div>
      </div>
    </div>`
    row.appendChild(cell)
    // col4
    cell = document.createElement('td')
    cell.classList.add("w-5")
    cell.innerHTML = `<ul class="dots-menu">
      <li class="nav-item drop-right">
        <a href="#" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke-width="1" fill="none" d="M12 18.7q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687.288-.288.688-.288.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.688.288-.287.688-.287.4 0 .688.287.287.288.287.688 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687Q11.6 5.3 12 5.3q.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Z"/>
          </svg>
        </a>
        <ul>
          <li class="nav-item">
            <a href="/admin/cursos/edit/${element.IDCURS}" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 20 20" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke-width=".4" fill="none" d="M6.85 20.575q-.6 0-1.012-.412-.413-.413-.413-1.013V4.85q0-.6.413-1.013.412-.412 1.012-.412h7.825L18.6 7.35v3.4h-.65V7.675h-3.6V4.05h-7.5q-.3 0-.55.25-.25.25-.25.55v14.275q0 .3.25.55.25.25.55.25h4.25v.65Zm-.8-.65V4.05 19.925ZM17.025 14.6l.45.425-3.75 3.75v1.1h1.1l3.775-3.75.45.45-3.95 3.95h-2v-2Zm2.025 1.975L17.025 14.6l1.05-1.05q.225-.2.525-.2.3 0 .475.2l1 1q.2.2.2.487 0 .288-.2.538Z"/></svg>
              </svg>
              Editar
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" onclick="{document.getElementById('idcurs').value ='${element.IDCURS}', document.getElementById('msgbor').innerHTML ='<p>${element.DESCUR}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-borrar">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 20 20" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke-width=".4" fill="none" d="M7.85 19.575q-.6 0-1.025-.425-.425-.425-.425-1.025v-12.1h-.975V5.4h3.6v-.675H15V5.4h3.6v.625h-.975V18.15q0 .6-.425 1.013-.425.412-1.025.412Zm9.125-13.55H7.05v12.1q0 .35.225.575.225.225.575.225h8.325q.3 0 .55-.25.25-.25.25-.55Zm-6.85 10.925h.625V8h-.625Zm3.15 0h.625V8h-.625ZM7.05 6.025V18.925 18.125Z"/>
              </svg>
              Borrar
            </a>
          </li>
          <div class="nav-divider"></div>
          <li class="nav-item">
            <a href="/admin/cursos/turnos/${element.IDCURS}" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" height="24" width="24" viewBox="0 0 20 20" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke-width=".4" fill="none" d="M9.7 19.3v-6.825q0-.275.1-.537.1-.263.325-.488L16.25 5.3h-3.2v-.625h4.275V8.95H16.7v-3.2l-6.15 6.125q-.125.125-.175.262-.05.138-.05.288V19.3Z"/></svg>
              Turnos
            </a>
          </li>
          <li class="nav-item">
            <a href="/admin/cursos/matriculas/${element.IDCURS}" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 20 20" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke-width=".4" fill="none" d="M15.85 13.5q-.8 0-1.362-.55-.563-.55-.563-1.375 0-.8.55-1.375t1.375-.575q.8 0 1.375.575t.575 1.375q0 .8-.575 1.363-.575.562-1.375.562Zm-4.9 4.925v-.85q0-.225.125-.462.125-.238.35-.388.975-.55 2.087-.862 1.113-.313 2.338-.313t2.325.313q1.1.312 2.125.862.2.15.338.388.137.237.137.462v.85Zm.625-1.05v.425h8.575v-.425q-1.025-.575-2.112-.887-1.088-.313-2.188-.313t-2.187.313q-1.088.312-2.088.887Zm4.275-4.5q.525 0 .913-.387.387-.388.387-.913t-.387-.913q-.388-.387-.913-.387t-.912.387q-.388.388-.388.913t.388.913q.387.387.912.387Zm0-1.3Zm0 6.225ZM4.275 13.3v-.65h6.7v.65Zm0-7.95v-.625H14.95v.625Zm7.775 3.975H4.275v-.65h8.3q-.125.15-.263.312-.137.163-.262.338Z"/></svg>
              Matrícula
            </a>
          </li>
          <div class="nav-divider"></div>
          <li class="nav-item">
            <a href="/admin/cursos/usuarios/${element.IDCURS}" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" height="24" width="24" viewBox="0 0 20 20" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke-width=".4" fill="none" d="M3.35 15.8v-.625h7.625v.625Zm0-7v-.625h7.625V8.8Zm12.7 8.725-2.6-2.575.45-.45 2.125 2.125 4.25-4.25.425.475Zm0-7-2.6-2.575.45-.45 2.125 2.125 4.25-4.25.425.475Z"/></svg>
              Certificados
            </a>
          </li>
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
const onclickPage = (pages, page) => {
  createPagination(pages, page)
  state.page = page
  buildTable(state)
}