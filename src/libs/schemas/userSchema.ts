import { z } from 'zod';
import {
  emailSchema,
  phoneSchema,
  passwordSchema,
  agreeSchema,
  passwordConfirmSchema,
  nameSchema,
  ageSchema,
  loginIdSchema,
  checkSchema,
  selectSchema,
} from '../validation';
// Zod
// 클라이언트가 전송한 데이터의 유효성을 검증할 수 있는 라이브러리
// typescript 4.5 이상 / yarn add zod
// 1. 스키마 선언: 사용자 정의 스키마를 사용해 복잡한 데이터 구조를 검증 할 수 있다.
// 객체, 배열, 숫자, 문자열 등 다양한 데이터 타입을 정의하고 검증 가능

// zod 스키마 정의
// 데이터의 형태와 구조를 정의
// z.obejct()를 사용해서 객체형태로 지정

//검증할 데이터 스키마
export const userSchema = z
  .object({
    loginId: loginIdSchema(),
    name: nameSchema(),
    age: ageSchema(),
    email: emailSchema(),
    phone: phoneSchema(),
    password: passwordSchema(),
    agree: agreeSchema(),
    passwordConfirm: passwordConfirmSchema(),
    check: checkSchema(),
    select: selectSchema(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });
