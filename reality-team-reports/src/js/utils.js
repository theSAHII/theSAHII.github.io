// pre-defined global functions
const
    doc = document,
    _$ = (e) => doc.querySelector(e),
    _$$ = (e) => doc.querySelectorAll(e),
    svg = {
        cross_square: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="122.88px" height="122.88px" viewBox="0 0 122.88 122.88"><g><path d="M7.513,0h107.854c2.066,0,3.944,0.845,5.306,2.207s2.207,3.24,2.207,5.306v107.854c0,2.066-0.846,3.944-2.207,5.306 c-1.361,1.362-3.239,2.207-5.306,2.207H7.513c-2.066,0-3.945-0.845-5.306-2.207C0.845,119.312,0,117.434,0,115.367V7.513 c0-2.066,0.845-3.945,2.207-5.306S5.447,0,7.513,0L7.513,0z M35.018,38.629c0,0.924,0.353,1.848,1.057,2.553l20.164,20.164 l0.094,0.095l-0.094,0.094L36.075,81.698c-0.705,0.705-1.057,1.629-1.057,2.553s0.353,1.849,1.057,2.554 c0.705,0.704,1.629,1.058,2.553,1.058c0.924,0,1.848-0.354,2.553-1.058l20.163-20.164l0.095-0.095l0.095,0.095l20.163,20.164 c0.705,0.704,1.63,1.058,2.554,1.058s1.849-0.354,2.553-1.058c0.705-0.705,1.058-1.63,1.058-2.554s-0.353-1.848-1.058-2.553 L66.641,61.534l-0.095-0.094l0.095-0.095l20.163-20.164c0.705-0.705,1.058-1.629,1.058-2.553s-0.353-1.848-1.058-2.553 c-0.704-0.705-1.629-1.057-2.553-1.057s-1.849,0.353-2.554,1.057L61.534,56.239l-0.095,0.095l-0.095-0.095L41.182,36.076 c-0.705-0.705-1.629-1.057-2.553-1.057c-0.924,0-1.848,0.353-2.553,1.057C35.371,36.781,35.018,37.705,35.018,38.629L35.018,38.629 z"/></g></svg>`,
        cross: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M1.63,97.99l36.55-36.55L1.63,24.89c-2.17-2.17-2.17-5.73,0-7.9L16.99,1.63c2.17-2.17,5.73-2.17,7.9,0 l36.55,36.55L97.99,1.63c2.17-2.17,5.73-2.17,7.9,0l15.36,15.36c2.17,2.17,2.17,5.73,0,7.9L84.7,61.44l36.55,36.55 c2.17,2.17,2.17,5.73,0,7.9l-15.36,15.36c-2.17,2.17-5.73,2.17-7.9,0L61.44,84.7l-36.55,36.55c-2.17,2.17-5.73,2.17-7.9,0 L1.63,105.89C-0.54,103.72-0.54,100.16,1.63,97.99L1.63,97.99z"/></g></svg>`,
        cross_line: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.878px" height="122.88px" viewBox="0 0 122.878 122.88" enable-background="new 0 0 122.878 122.88" xml:space="preserve"><g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"/></g></svg>`,
        check_square: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.881px" height="122.88px" viewBox="0 0 122.881 122.88" enable-background="new 0 0 122.881 122.88" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M7.246,0h108.389c1.992,0,3.805,0.815,5.117,2.128s2.129,3.125,2.129,5.117 v108.388c0,1.993-0.816,3.805-2.129,5.117c-1.313,1.313-3.125,2.129-5.117,2.129H7.246c-1.993,0-3.804-0.815-5.118-2.129 C0.815,119.438,0,117.627,0,115.634V7.246c0-1.993,0.815-3.804,2.128-5.117C3.442,0.815,5.253,0,7.246,0L7.246,0z M32.036,68.054 l0.011,0.01l0.006,0.006l0.012,0.01v0.001l16.98,15.397c0.399,0.361,0.852,0.629,1.329,0.803c0.496,0.181,1.018,0.261,1.536,0.241 c0.503-0.019,1.003-0.131,1.47-0.334c0.451-0.196,0.873-0.479,1.241-0.848l0.012-0.01l0.033-0.028l0.001-0.001 c0.012-0.011,0.023-0.021,0.032-0.03l36.346-38.065c0.379-0.398,0.66-0.853,0.846-1.334v0c0.193-0.5,0.281-1.033,0.27-1.561 c-0.014-0.528-0.129-1.055-0.348-1.547c-0.209-0.473-0.514-0.913-0.91-1.291L90.9,39.471c-0.396-0.378-0.852-0.66-1.334-0.845l0,0 c-0.5-0.192-1.031-0.282-1.561-0.269c-0.527,0.013-1.055,0.129-1.545,0.347c-0.473,0.209-0.912,0.513-1.291,0.91l-0.002,0.001 L51.642,74.729l-0.09,0.094l-0.097-0.087l-13.972-12.67c-0.406-0.367-0.867-0.638-1.354-0.812c-0.505-0.18-1.036-0.256-1.562-0.23 c-0.523,0.026-1.042,0.154-1.524,0.381c-0.464,0.219-0.895,0.53-1.262,0.932l-0.003,0.003c-0.007,0.007-0.016,0.017-0.024,0.026 l-0.002,0.003c-0.363,0.405-0.629,0.864-0.8,1.348c-0.178,0.501-0.253,1.029-0.227,1.552c0.026,0.523,0.153,1.042,0.379,1.523 C31.323,67.256,31.634,67.687,32.036,68.054L32.036,68.054L32.036,68.054z"/></g></svg>`,
        check: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.877px" height="101.052px" viewBox="0 0 122.877 101.052" enable-background="new 0 0 122.877 101.052" xml:space="preserve"><g><path d="M4.43,63.63c-2.869-2.755-4.352-6.42-4.427-10.11c-0.074-3.689,1.261-7.412,4.015-10.281 c2.752-2.867,6.417-4.351,10.106-4.425c3.691-0.076,7.412,1.255,10.283,4.012l24.787,23.851L98.543,3.989l1.768,1.349l-1.77-1.355 c0.141-0.183,0.301-0.339,0.479-0.466c2.936-2.543,6.621-3.691,10.223-3.495V0.018l0.176,0.016c3.623,0.24,7.162,1.85,9.775,4.766 c2.658,2.965,3.863,6.731,3.662,10.412h0.004l-0.016,0.176c-0.236,3.558-1.791,7.035-4.609,9.632l-59.224,72.09l0.004,0.004 c-0.111,0.141-0.236,0.262-0.372,0.368c-2.773,2.435-6.275,3.629-9.757,3.569c-3.511-0.061-7.015-1.396-9.741-4.016L4.43,63.63 L4.43,63.63z"/></g></svg>`,
        check_line: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.881px" height="89.842px" viewBox="0 0 122.881 89.842" enable-background="new 0 0 122.881 89.842" xml:space="preserve"><g><path d="M1.232,55.541c-1.533-1.388-1.652-3.756-0.265-5.289c1.388-1.534,3.756-1.652,5.29-0.265l34.053,30.878l76.099-79.699 c1.429-1.501,3.804-1.561,5.305-0.132c1.502,1.428,1.561,3.803,0.133,5.305L43.223,88.683l-0.005-0.005 c-1.396,1.468-3.716,1.563-5.227,0.196L1.232,55.541L1.232,55.541z"/></g></svg>`,
    };

// functions for specific purpose
const
    Page = {
        setTitle: (str) => _$("head title").textContent = str,
        var: {
            set: (name, value) => _$(`var-${name}`).textContent = value
        }
    }

// variables
const alpha_nth = ["Zeroth", "First", "Second", "Third", "Fourth", "Fifth", "Sixth"]

// convert 2d arr to json obj
function arr2obj(arr2D) {
    let keys = arr2D[0]
    let arr_of_obj = {}
    for (let i = 1; i < arr2D.length; i++) {
        let obj = {}
        for (let j = 0; j < keys.length; j++) {
            obj[keys[j]] = arr2D[i][j]
        }
        arr_of_obj[arr2D[i][0]] = obj
    }
    return arr_of_obj
}