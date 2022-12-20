const months = [, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let generated_calender = {}

const Calender = {
    generate: {
        // month: function (year, monthNo) {

        //     if (generated_calender[year] && generated_calender[year][monthNo]) return generated_calender[year][monthNo]

        //     let _m = [[...days]],
        //         first_day = new Date(year, monthNo, 1).getDay(),
        //         last_date = new Date(year, monthNo + 1, 0).getDate(),
        //         week = 0,
        //         dy = 1

        //     for (i = 0; i <= 41; i++) {
        //         if ((i % 7) == 0) {
        //             _m.push([])
        //             week++
        //         }
        //         // if week is over then start a new line 
        //         if ((i >= first_day) && (dy <= last_date)) {
        //             _m[week].push(dy)
        //             dy = dy + 1;
        //         } else {
        //             (_m[week]).push(0)
        //         }
        //         // Blank dates. 
        //     }
        //     // end of for loop

        //     if (generated_calender[year]) generated_calender[year][monthNo] = _m
        //     else {
        //         generated_calender[year] = {}
        //         generated_calender[year][monthNo] = _m
        //     }

        //     return generated_calender[year][monthNo]
        // }
    },
    find: {
        // weekNo: function (year, monthNo, date) {
        //     Calender.generate.month(year, monthNo)
        //     let _month_calendar = generated_calender[year][monthNo],
        //         week_no = -1;
        //     for (let i = 1; i < _month_calendar.length; i++) {
        //         let row = _month_calendar[i]
        //         if (row.indexOf(date) >= 0) {
        //             week_no = i
        //             break;
        //         }
        //     }
        //     return week_no
        // },
        weekNo2: function (year, monthNo, date) {
            let startDay = (new Date(year, monthNo, 1)).getDay(),
                noOfDays = new Date(year, monthNo + 1, 0).getDate(),
                weekNo = 1,
                weekNo_date = -1,
                day = 1;

            for (let i = 0; i <= 41; i++) {
                if (i % 7 === 0) weekNo++
                if (i >= startDay && day <= noOfDays) {
                    if (date === day) {
                        weekNo_date = weekNo
                        break
                    }
                    day++
                }
            }

            return weekNo_date
        }
    },
    get: {
        detailInfo: {
            date: function (year, monthNo, date) {
                return {
                    year: year,
                    halfYearNo: Math.ceil((monthNo + 1) / 6),
                    halfYearName: alpha_nth[Math.ceil((monthNo) / 6)] + " Half",
                    quarterNo: Math.ceil((monthNo + 1) / 3),
                    quarterName: alpha_nth[Math.ceil((monthNo) / 3)] + " Quarter",
                    monthNo: monthNo,
                    monthName: months[monthNo] + "",
                    weekNo: Calender.find.weekNo2(year, monthNo, date),
                    weekName: alpha_nth[Calender.find.weekNo2(year, monthNo, date)] + " Week",
                    date: date,
                }
            }
        }
    }
}
