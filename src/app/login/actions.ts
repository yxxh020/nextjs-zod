'use server';
// 서버에서만 실행되어야하는 서버 액션 코드(db호출, api 요청 등)를 정의할때 사용해서
// 클라이언트 컴포넌트에서 호출할 수 있게 해준다.
import { userSchema } from '@/libs/schemas/userSchema';

export type FormState = {
  errors: {
    [key: string]: string[] | undefined;
  };
  message: string | null;
};

export async function createUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = await userSchema.spa({
    //parse: 리턴값이 유효하지 않으면(유효성 검증에 실패하면) throw error

    //safeParse: 검증에 실패해도 오류를 발생시키지 않고 정보가 포함된 zodError 인스턴스를 포함한 객체를 리턴해줌

    //safeParseAsyc: aka spa 비동기적 refine이나 transform을 사용하는 경우 await 사용해서 비동기적으로 수행
    name: formData.get('name'),
    age: formData.get('age'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    password: formData.get('password'),
    agree: formData.get('agree'),
    passwordConfirm: formData.get('passwordConfirm'),
    loginId: formData.get('loginId'),
    check: formData.getAll('check'), //getAll사용해서 array data 받기
    select: formData.get('select'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed',
    };
  }
  return {
    errors: {},
    message: 'submit success',
  };
}

// 1. 사용자가 폼 입력
// 2. <form action={dispatch}> 폼 제출
// 3. dispatch로 createuserAction 호출
// 4. createuseraction 함수 안에서  스키마 safeparse 해서 입력값 유효성 검사
