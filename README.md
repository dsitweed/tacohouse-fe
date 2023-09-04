<h1 align="center">
  <br>
  Tacohouse
  <br>
</h1>

<br>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Requirement

- Have yarn
- This project use yarn

## Installation - How to use

```bash
$ git clone https://github.com/dsitweed/tacohouse-fe

$ yarn install
```

## Running the app

```bash
# development
$ yarn run dev

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov

```

## Linting and formatting

```bash
# Lint and autofix with eslint
$ npm run lint

# Format with prettier
$ npm run format
```

# Design structure

## Data base design link: https://dbdiagram.io/d/64acf24602bd1c4a5ed93b65

### Các cụm chức năng - Key Features:

1. User

- CRUD
- Login
- Register (Ngay từ khi register đã cần nhập đủ các thông tin + chọn role)
- Logout
- Update information (Bao gồm cả thay đổi mật khẩu)
- Chuyển đổi role (Pending - Sẽ cần thỏa mãn các điều kiện trước khi chuyển đổi - Không có phòng cho thuê, hoặc đang không thuê phòng nào cả <=> reset về new user)

2. Manager

- Hiện tại chưa hỗ trợ trong tương lai phát triển thì các chức năng chắc cũng sẽ không nhiều

3. Tenant

- Đăng ký cho tenant vào thuê 1 phòng (tự động trạng thái phòng -> is_active = false)
- CRUD
- Delete chỉ chuyển trạng thái is_active = false

4. Building

- CRUD

5. Room

- CRUD
- Chuyển trạng thái phòng (Chức năng ít dùng - có thể chuyển về is_active = True khi phòng đấy đang có người ở nhưng sắp chuyển đi -> Rao cho thuê trước)
- Đăng ký số ngày mà phòng sẽ trống trong tương lai
- Đang góc nhìn FE: Chuyển trạng thái phòng (Mặc định is_active = true sẽ đăng thông tin phòng nên trang chủ) - 1 route riêng biệt
- Đang góc nhìn FE: Route thuê phòng: Các thông tin cơ bản của phòng hiển thị (ko đc sửa, sửa ở route 1)
- 2 route trên vẫn là Update mà thôi

6. Facility

- CRUD

7. Invoice

- CRUD
- Route delete cần cẩn thận làm thật bảo mật và an toàn - chắc sẽ chưa hiện ngay lên FE

8. Image

- Đăng ảnh
- Xóa ảnh

9. Thống kê + filter

- Lấy thông tin các building của 1 manager
- Lấy thông tin các phòng: ko có gì cả - lấy tất cả các phòng đang quản lý của manager, lấy các phòng của 1 building, lấy các phòng đang có trạng thái is_active = true / false;
- Lấy các phòng theo thời gian sắp bị trống, hoặc theo biến số ngày

10. Chat

- Qua socket của web
- Nhắn tin qua zalo

# Install package - Tech

```bash
# Init project
yarn create vite tacohouse-fe --template react-ts

# Install tailwindcss
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p

# antd
yarn add antd

# Eslint + prettier
yarn add -D eslint prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks

# Redux toolkit
yarn add @reduxjs/toolkit react-redux

# React router dom
yarn add react-router-dom

# React + i18n
yarn add i18next react-i18next

# Icons for app
yarn add react-icons

# Chart
yarn add chart.js react-chartjs-2

# Axios
yarn add axios

# Fire base
yarn add firebase

```

### `Firebase`

```bash
npm install firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4ieuauG2fN5h53MD1vUPixzA3TcUxb8o",
  authDomain: "tacohouse-101e1.firebaseapp.com",
  projectId: "tacohouse-101e1",
  storageBucket: "tacohouse-101e1.appspot.com",
  messagingSenderId: "411781811301",
  appId: "1:411781811301:web:886697d341923c0333ca8c",
  measurementId: "G-MSYL8BZ2V3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

# Note:

- Khi tạo tài khoản (Cần email, password, role) -> tạo User
  - -> tài khoản Tenant hoặc Manager hoặc Admin

* [Documentation of TacoHouse](https://docs.google.com/spreadsheets/d/14KMTWs6TFY7ulHDhdgqIXJCCnXudpSwOw-83UEgn5bE/edit?usp=sharing)

* Ở đây phòng khi bị trống: gọi là room available
* Git commmit [rule](https://dev.to/ashishxcode/mastering-the-art-of-writing-effective-github-commit-messages-5d2p?fbclid=IwAR0PNnH_tbIVV_CR4KU4wcKurgkEi8s5Lvot6CB3whKJesnm1a33wvUuUs0)

## Commit rule

- `build`: Build related changes (eg: npm related/ adding external dependencies)
- `chore`: A code change that external user won't see (eg: change to .gitignore file or .prettierrc file)
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation related changes
- `refactor`: A code that neither fix bug nor adds a feature. (eg: You can use this when there is semantic changes like renaming a variable/ function name)
- `perf`: A code that improves performance
- `style`: A code that is related to styling
- `test`: Adding new test or making changes to existing test

## Bug when coding

1. Bug 1

## Tài liệu tham khảo

- Tham khảo thêm github repo: [finefoods-antd](https://github.com/refinedev/refine/tree/master/examples/finefoods-antd)

* Link demo: https://example.admin.refine.dev/

## Tham khảo thiết kế giao diện

-Link gốc - design template for user - guest hoặc người đi thuê trọ
https://websitedemos.net/budget-hotel-04/

- link gốc - design template for manager - chủ nhà trọ

* https://lineone.piniastudio.com/dashboards-orders.html
* https://travl.dexignlab.com/react/demo/dashboard

- Thiết kế trang web chạy thực sự

* Của Nhật: https://www.homes.co.jp/
* Của Mỹ: https://www.zillow.com/

## Note:

- Develop mock api: https://jsonplaceholder.typicode.com/

## Những điều học được

- Bảo vệ route bằng cách xử lý ở Outlet
- Sử dụng cookie - gắn vào trong axios thông qua interceptors

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [Marked - a markdown parser](https://github.com/chjj/marked)
- [showdown](http://showdownjs.github.io/showdown/)
- [CodeMirror](http://codemirror.net/)
- Emojis are taken from [here](https://github.com/arvida/emoji-cheat-sheet.com)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Support

<a href="https://www.buymeacoffee.com/5Zn8Xh3l9" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## License

MIT

---
