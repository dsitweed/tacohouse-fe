/** Error: clone.weekday is not a function
 * https://stackoverflow.com/questions/76650410/antd-dayjs-typeerror-clone-weekday-is-not-a-function
 * https://github.com/khang194591/IT3362-web-app/blob/master/src/plugins/dayjs/index.ts
 * Need dayjs.locale(initLanguage); to can show "31 minutes ago" in vietnamese
 */

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
