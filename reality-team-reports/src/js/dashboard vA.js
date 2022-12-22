

const Fetch = {
    Post: function (data) {
        const api = "https://script.google.com/macros/s/AKfycbwBGe323EqEQBI1gfdYR-YEM0YrUtjAk75DM9CBIgQUpe2z9h6tlQtjhr78jGWdP_S2mw/exec";
        let options = {
            method: "POST",
            body: data
        }

        return new Promise((resolve, reject) => (
            fetch(api, options)
                .then(response => response.json())
                .then(data => { return resolve(data) })
                .catch((error) => {
                    console.error('Error:', error);
                    return reject(error)
                })
        ))
    },
    Get: function (query) {
        const api = "https://script.google.com/macros/s/AKfycbxVHrGqcC4jG_wPtkSkT_cwbtGkdZ5PfDZiQW0j-HRcSHusR0XhVdIqjBmJO7zexXs-XA/exec?" + query;
        let options = {
            method: 'GET',
            redirect: 'follow'
        }

        return new Promise((resolve, reject) => (
            fetch(api, options)
                .then(response => response.text())
                .then(data => { return resolve(JSON.parse(data)) })
                .catch((error) => {
                    console.error('Error:', error);
                    return reject(error)
                })
        ))
    }
}

let currentViewNo = 1

const dom = {
    templates: {
        head: "<thead><th>NAME</th><th>VISITS</th><th>BOOKINGS</th><th>VALUE (CR.)</th><th>TARGET</th></thead>",
        statushead: "<thead><th>DATE</th><th>NAME</th><th>VISITS</th><th>BOOKINGS</th><th>VALUE (CR.)</th><th>TARGET</th></thead>",
        body: (id, data) => `<tr data-parent-id="${id}" data-id="${data["STAFF NAME"]}" class="hide"><td>${data["STAFF NAME"]}</td><td>${data["VISITS"]}</td><td>${data["BOOKINGS"]}</td><td>${data["VALUE (CR.)"]}</td><td></td></tr>`,
        // full: (id, summary, data) => `<details class="daily" id="${id}"><summary>${summary}</summary><table>${dom.templates.head}${dom.templates.body(data)}</table></details>`,
        full: (id, summary, data) => `<tr data-clickable-id="${id}" onclick="dom.viewHandler.toggle.clickable(this)" class="preventTextSelection"><td colspan="5">&nbsp;${summary}</td></tr>${dom.templates.body(id, data)}`,
        // status: (btns, data) => `<div data-id="${data["ID"]}"><span><span class="date">${data.DATE}/${data.MONTH}/${data.YEAR}</span><span>${btns}</span></span><span><span class="name">${data["STAFF NAME"]}</span><span></span></span><span><span>VISITS</span><span>${data["VISITS"]}</span></span><span><span>BOOKINGS</span><span>${data["BOOKINGS"]}</span></span><span><span>VALUE (CR.)</span><span>${data["VALUE (CR.)"]}</span></span></div>`,
        status: (btns, data) => `<tr data-id="${data["ID"]}" data-date="${data.YEAR}/${data.MONTH}/${data.DATE}" class=""><td class="date" data-sort="${data.YEAR}${data.MONTH}${data.DATE}">${data.DATE}/${data.MONTH}/${data.YEAR}</td><td class="name">${data["STAFF NAME"]}</td><td class="visits">${data["VISITS"]}</td><td class="bookings">${data["BOOKINGS"]}</td><td class="value">${data["VALUE (CR.)"]}</td><td></td><td class="btns-container">${btns}</td></tr>`,
    },
    add: {
        statRow: function (selector, data) { _$(selector).innerHTML += dom.templates.body(data); },
        statValue: (selector, data) => {
            let childrens = _$(selector).children;
            (childrens[1]).innerHTML = parseInt((childrens[1]).innerHTML) + parseInt(data["VISITS"]);
            (childrens[2]).innerHTML = parseInt((childrens[2]).innerHTML) + parseInt(data["BOOKINGS"]);
            (childrens[3]).innerHTML = parseInt((childrens[3]).innerHTML) + parseInt(data["VALUE (CR.)"]);
        },
        stat: async function (data) {

            // console.log(Calender.get.detailInfo.date(data.YEAR, data.MONTH, data.DATE))

            let { year, halfYearNo, halfYearName, quarterNo, quarterName, monthNo, monthName, weekNo, weekName, date } = Calender.get.detailInfo.date(data.YEAR, data.MONTH, data.DATE),
                s = null,
                status = data["STATUS"]

            if (status != 1) {
                let statusType = undefined

                if (status == 0) statusType = "pending"
                else if (status == -1) statusType = "reject"

                dom.add.status(statusType, data)
                return
            }

            // function insertAfter(newNode, existingNode) {
            //     existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
            // }
            function insertAfter(htmlPart, id) {
                let existingNode = _$(`[data-parent-id="${id}"]`),
                    newNode = doc.createElement("tbody")
                newNode.innerHTML = `${htmlPart}`
                newNode = newNode.firstChild
                existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
            }

            // daily
            let id = `${year}/${monthNo}/${date}`,
                summary = `${date} ${monthName} ${year}`;
            s = `#daily [data-clickable-id = "${id}"]`
            if (_$(s))
                insertAfter(dom.templates.body(id, data), id)
            else {
                _$("#daily tbody").innerHTML += dom.templates.full(id, summary, data)
            }
            // end

            const addStatOF = (type, id, summary) => {
                let s = `#${type} tbody [data-clickable-id="${id}"]`
                if (_$(s)) {
                    let staff = `#${type} tbody [data-id="${data["STAFF NAME"]}"]`
                    if (_$(staff)) {
                        dom.add.statValue(`#${type} tbody [data-id="${data["STAFF NAME"]}"]`, data)
                    }
                    else {
                        insertAfter(dom.templates.body(id, data), id)
                    }
                } else {
                    _$(`#${type} tbody`).innerHTML += dom.templates.full(id, summary, data)
                }
            }

            // weekly
            addStatOF("weekly", `${year}-${monthNo} ${weekNo}`, `${weekName} of &nbsp${monthName} ${year}`)
            // monthly
            addStatOF("monthly", `${year}-${monthNo}`, `${monthName} ${year}`)
            // quarterly
            addStatOF("quarterly", `${year} q-${quarterNo}`, `${quarterName} of &nbsp${year}`)
            // half-yearly
            addStatOF("half_yearly", `${year} hy-${halfYearNo}`, `${halfYearName} of &nbsp${year}`)
            //  yearly
            addStatOF("yearly", `${year}`, `${year}`)
            // end
        },
        status: function (type, data) {
            let
                s = "#",
                btns = `<span class="btn preventTextSelection" type="approve" onclick="_requestFor.update.status(this,1)">${svg.check_square}</span>`


            if (type == "pending") {
                s += "pending"
                btns += `<span class="btn preventTextSelection" type="reject" onclick="_requestFor.update.status(this,-1)">${svg.cross_square}</span>`
            }
            else if (type == "reject") {
                s += "reject"
            }
            _$(s + " tbody").innerHTML += dom.templates.status(btns, data)
        }
    },
    update: {
        status: function (statusType, e) {
            let _ = (s) => e.querySelector(s),
                data = {
                    "ID": e.getAttribute("data-id"),
                    "DATE": parseInt((e.getAttribute("data-date").split("/"))[2]),
                    "MONTH": parseInt((e.getAttribute("data-date").split("/"))[1]),
                    "YEAR": parseInt((e.getAttribute("data-date").split("/"))[0]),
                    "STAFF NAME": _(".name").innerText,
                    "VISITS": _(".visits").innerText,
                    "BOOKINGS": _(".bookings").innerText,
                    "VALUE (CR.)": _(".value").innerText,
                    "STATUS": statusType,
                }
            if (statusType == 1) {
                dom.add.stat(data)
                e.remove()
            }
            else if (statusType == -1) {
                dom.add.status("reject", data)
                e.remove()
            }
        }
    },
    viewHandler: {
        show: {
            stat: function () {
                let e_showSTATS = _$("[name='showSTATS']");
                (Object.values(_$("#stats").children)).forEach(child => {
                    if (child.tagName == "TABLE")
                        child.style.display = "none"
                })
                _$(`#${e_showSTATS.value}`).style.display = "initial"
            }
        },
        toggle: {
            view: function () {
                // hide all
                _$("#stats").style.display = "none"
                _$("#reject").style.display = "none"
                _$("#pending").style.display = "none"

                if (currentViewNo === 0) {
                    currentViewNo = 1
                    _$("#pending").style.display = "initial"
                    _$("#view-switcher").innerText = "STATS"
                    _$("#info mark").innerText = "Pending Requests"
                    return
                }
                else if (currentViewNo == 1) {
                    currentViewNo = -1
                    _$("#stats").style.display = "initial"
                    _$("#view-switcher").innerText = "REJECT"
                    _$("#info mark").innerText = "Reports & Statistics"
                    return
                }
                else {
                    currentViewNo = 0
                    _$("#reject").style.display = "initial"
                    _$("#view-switcher").innerText = "PENDING"
                    _$("#info mark").innerText = "Rejected Requests"
                }
            },
            clickable: function (self) {
                let clickID = self.getAttribute("data-clickable-id"),
                    parent = self.parentNode,
                    childrens = parent.querySelectorAll(`[data-parent-id="${clickID}"]`)

                childrens.forEach(child => child.classList.toggle("hide"))
            }
        },
        notify: function (string) {
            _$("#notification-box").classList.remove("hide")
            _$("#notification-box").innerText = string
            setTimeout(() => _$("#notification-box").classList.add("hide"), 3000);
        }
    }
}

const search = {
    init: function (selector) {
        let searchInput = _$(selector)

        searchInput.addEventListener("keypress", search.find, false)
        window.addEventListener("keypress", function (e) {
            let isSearchInputFocued = document.activeElement === searchInput
            if (e.key === "/" && !isSearchInputFocued) {
                searchInput.focus()
                if (searchInput.value.length <= 0)
                    setTimeout(() => searchInput.value = searchInput.value.slice(0, -1), 5);
            }
        }, false);
    },
    find: function (e) {
        let value = (e.target.value).toLowerCase(),
            listOfSearchableElements = [
                ..._$$("[data-clickable-id]"),
                ..._$$("#pending * [data-id]"),
                ..._$$("#reject * [data-id]")
            ],
            makeAllVisible = false;

        if (value.length < 1) makeAllVisible = true

        listOfSearchableElements.forEach(function (item) {
            let context = (item.innerText || item.textContent).toLowerCase()

            if (makeAllVisible) {
                item.classList.remove("hide")
            } else if (context.includes(value)) {
                item.classList.remove("hide")
            } else {
                item.classList.add("hide")
            }
        })
    }
}

// const sort = {
//     init: function () {
//         let sortBtn = _$("#sort-btn")
//         sortBtn.onclick = function () {
//             let context = sortBtn.innerText || sortBtn.textContent,
//                 isASC = false
//             if (context === "ASC") {
//                 sortBtn.innerText = "DESC"
//                 isASC = true
//             } else {
//                 sortBtn.innerText = "ASC"
//                 isASC = false
//             }
//         }
//         // })
//     },
//     elementById: function (isASC, selector, parentID, regexArr) {
//     }
// }

function init_dashboard() {
    username = CookieJS.get("name") || false

    if (!username) window.location.href = "login.html"

    Page.setTitle(username + " | DASHBOARD")
    Page.var.set("username", username)

    dom.viewHandler.toggle.view()
    _$("#view-switcher").onclick = dom.viewHandler.toggle.view
    dom.viewHandler.show.stat()
    _$("[name='showSTATS']").onchange = dom.viewHandler.show.stat;

    (["daily", "weekly", "monthly", "quarterly", "half_yearly", "yearly"]).forEach(id => {
        _$("#" + id).innerHTML += dom.templates.head + "<tbody></tbody>"
    });
    (["pending", "reject"]).forEach(id => _$("#" + id).innerHTML += dom.templates.statushead + "<tbody></tbody>")

    search.init("#search-box input")

}
