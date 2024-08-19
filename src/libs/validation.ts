import { z } from 'zod';
import { checkUserExists } from '../services/auth';

// string(): 문자열 타입을 나타내며, 문자열에 대한 유효성 검사를 수행
// number(): 숫자 타입을 나타내며, 숫자에 대한 유효성 검사를 수행
// boolean(): 부울 타입을 나타내며, 참/거짓 값에 대한 유효성 검사를 수행
// array(): 배열 타입을 나타내며, 배열에 대한 유효성 검사를 수행
// object(): 중첩된 객체를 정의할 수 있으며, 객체에 대한 유효성 검사를 수행
// nullable(): 값이 null일 수 있는지 여부를 나타냄
// optional(): 값을 생략할 수 있는지 여부를 나타냄
// refine(): 사용자 정의 유효성 검사 함수를 정의
// superRefine(): 다중 조건 검증, 여러개의 오류 반환

// export const loginIdSchema = () =>
//   z
//     .string()
//     .min(1, { message: '아이디를 입력해 주세요.' })
//     .refine(
//       //아이디 중복 체크
//       async (id) => {
//         const result = await checkUserExists(id);
//         if (result.code !== 200) {
//           return true;
//         }
//       },
//       {
//         message: '이미 사용중인 아이디 입니다',
//       }
//     );

//superRefine
export const loginIdSchema = () =>
  z.string().superRefine(async (id, ctx) => {
    // 최소길이 검증
    if (id.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        type: 'string',
        minimum: 1,
        inclusive: true,
        message: '아이디를 입력해 주세요',
      });
      return; // 검증 실패하면 멈춤
    }

    //아이디 중복 체크
    const result = await checkUserExists(id);
    if (result.code === 200) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '이미 사용중인 아이디 입니다',
      });
      return;
    }
  });

export const nameSchema = () =>
  z.string().min(1, { message: '이름을 입력해 주세요' });

// export const ageSchema = () =>
//   z.number({
//     required_error: 'required', // 필수입력값 에러
//     // invalid_type_error: '타입에러',
//   });
export const ageSchema = () =>
  //z.coerce 특정 타입으로 자동 변환
  z.coerce.number().positive({ message: '나이를 입력해 주세요' });

export const emailSchema = () =>
  z.string().email({ message: '유효한 이메일 주소를 입력해 주세요' });

//superRefine을 사용해서 순서대로 검증. 실패하면 다음 검증으로 넘어가지 않고 중단
export const phoneSchema = () =>
  z.string().superRefine((val, ctx) => {
    if (val.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '전화번호를 입력해 주세요',
      });
      return; // 검증 실패하면 멈춤
    }

    if (!val.startsWith('010')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '올바른 번호를 입력해 주세요',
      });
      return; // 검증 실패하면 멈춤
    }

    if (val.length !== 11) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '전화번호 11자리를 입력해 주세요',
      });
      return;
    }
  });

//superRefine
export const passwordSchema = () =>
  z.string().superRefine((value, ctx) => {
    // 최소길이 검증
    if (value.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        type: 'string',
        minimum: 8,
        inclusive: true,
        message: '비밀번호는 최소 8자리 이상이어야 합니다',
      });
      return; // 검증 실패하면 멈춤
    }

    // 정규식 검증 (소문자, 숫자, 특수문자 포함)
    const regex =
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,15}$/;
    if (!regex.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호는 소문자, 숫자, 특수문자의 조합이어야 합니다',
      });
      return; // 검증 실패하면 멈춤
    }
  });

//radio
export const agreeSchema = () =>
  //zod enum은 min  속성이 없기 때문에 ErrorMap 사용해서 에러메세지 커스텀

  z.enum(['Y', 'N'], {
    errorMap: () => ({ message: '동의 여부를 선택해 주세요' }),
    //zodIssueCode에 따라 메세지 커스텀 가능
    // invalid_type: "invalid_type";
    // invalid_literal: "invalid_literal";
    // custom: "custom";
    // invalid_union: "invalid_union";
    // invalid_union_discriminator: "invalid_union_discriminator";
    // invalid_enum_value: "invalid_enum_value";
    // unrecognized_keys: "unrecognized_keys";
    // invalid_arguments: "invalid_arguments";
    // invalid_return_type: "invalid_return_type";
    // invalid_date: "invalid_date";
    // invalid_string: "invalid_string";
    // too_small: "too_small";
    // too_big: "too_big";
    // invalid_intersection_types: "invalid_intersection_types";
    // not_multiple_of: "not_multiple_of";
    // not_finite: "not_finite";

    // errorMap: (issue, ctx) => {
    //   if (issue.code == z.ZodIssueCode.invalid_type) {
    //     return { message: '동의 여부를 선택해 주세요' };
    //   } else {
    //     return { message: ctx.defaultError };
    //   }
    // },
  });

export const passwordConfirmSchema = () =>
  z.string().min(1, { message: '비밀번호 확인을 입력해 주세요' });

export const checkSchema = () =>
  // z
  //   .string({
  //     errorMap: () => ({ message: '최소 하나의 스포츠를 선택해 주세요' }),
  //   })
  //   .array()
  z
    .array(z.string(), {
      invalid_type_error: '최소 하나의 스포츠를 선택해 주세요',
    })
    .nonempty({ message: '최소 하나의 스포츠를 선택해 주세요' });

export const selectSchema = () =>
  z.string().min(1, { message: '옵션을 선택해 주세요' });
