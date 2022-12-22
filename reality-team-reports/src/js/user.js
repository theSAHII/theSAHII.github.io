
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
        Fetch.Get("type=user&name=Jyoti")
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
                Fetch.Get(`type=update&id=${dataID}&status=0`)
                    .then(res => {
                        dom.update.status(0, parent)
                        dom.viewHandler.notify("Send For Approval")
                    })
            }
        }
    }
}

function FormHandler(e) {
    e.preventDefault()

    let v = _$("#form [name='visits']").value
    let b = _$("#form [name='bookings']").value
    let c = _$("#form [name='value']").value
    let query = `type=form&name=${username}&visits=${v}&bookings=${b}&value=${c}`

    // console.log(query)

    Fetch.Get(query)
        .then(result => {
            dom.viewHandler.notify("Send for Approval.")
            window.location.reload()
        })
}

// init
function init_user() {
    currentViewNo = 2
    init_dashboard()

    _requestFor.data()

    _$("#form").onsubmit = FormHandler
}
init_user()

