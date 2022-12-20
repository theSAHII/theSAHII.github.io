
// basket.require(
//     { url: "../lib/CookieJS.js", key: "cookieJS" },
//     { url: "../js/calender.js", key: "calendarJS" },
//     { url: "../js/utils.js", key: "utilsJS" },
//     { url: "../js/dashboard.js", key: "dashboardJS" },
// ).then((result) => InitializePage())
let _data = undefined

const _requestFor = {
    data: function () {
        Fetch.Get("admin=true")
            .then(result => {
                _data = arr2obj(result)
                for (let data of Object.values(_data))
                    dom.add.stat(data);

                setTimeout(() => sort.init(), 500);
                // console.log(result)
            })
    },
    update: {
        status: function (e, statusType) {
            let parent = e.parentNode.parentNode.parentNode,
                dataID = parent.getAttribute("data-id")

            if (statusType == 1) {  //  approve
                Fetch.Post({ type: "update", id: dataID, status: 1 })
                    .then(res => {
                        dom.update.status(1, parent)
                        console.log(res)
                    })
            } else if (statusType == -1) {  //  reject
                Fetch.Post({ type: "update", id: dataID, status: -1 })
                    .then(res => {
                        dom.update.status(-1, parent)
                        console.log(res)
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
