
// basket.require(
//     { url: "../lib/CookieJS.js", key: "cookieJS" },
//     { url: "../js/calender.js", key: "calendarJS" },
//     { url: "../js/utils.js", key: "utilsJS" },
//     { url: "../js/dashboard.js", key: "dashboardJS" },
// ).then((result) => InitializePage())
let _data = undefined
let username = undefined

const _requestFor = {
    data: function () {
        Fetch.Get("type=admin")
            .then(result => {
                _data = arr2obj(result)
                for (let data of Object.values(_data))
                    dom.add.stat(data);
            })
    },
    update: {
        status: function (e, statusType) {
            let parent = e.parentNode.parentNode,
                dataID = parent.getAttribute("data-id")

            if (statusType == 1) {  //  approve
                Fetch.Get(`type=update&id=${dataID}&status=1`)
                    // Fetch.Post({ type: "update", id: dataID, status: 1 })
                    .then(res => {
                        dom.update.status(1, parent)
                        dom.viewHandler.notify("Approved")
                    })
            } else if (statusType == -1) {  //  reject
                Fetch.Get(`type=update&id=${dataID}&status=-1`)
                    // Fetch.Post({ type: "update", id: dataID, status: -1 })
                    .then(res => {
                        dom.update.status(-1, parent)
                        dom.viewHandler.notify("Rejected")
                    })
            }
        }
    }
}
// _requestFor.update.status(this,1)

// init
function init_admin() {
    currentViewNo = 0
    init_dashboard()

    _requestFor.data()
}
init_admin()
