'use client';
// App내의 모든 컴포넌트는 기본적으로 서버 컴포넌트이지만 파일 최상단에 'use client' 배치하여 클라이언트 컴포넌트로 사용가능

// 서버 컴포넌트: 애플리케이션의 서버 부분에서 렌더링 되는 컴포넌트
//               js 번들 크기에 영향을 미치는 큰 의존성은 서버에 유지해서 성능 향상
// 클라이언트 컴포넌트: 클라이언트 측 인터렉션 추가 가능
//                   hydration을 기다리지 않고 브라우저에서 직접 함수 실행 가능

import { useFormState } from 'react-dom';
import { createUserAction } from './actions';

export default function Page() {
  const initialState = { errors: {}, message: null };
  const [state, dispatch] = useFormState(createUserAction, initialState);
  // useFormState
  // action과 initialState(기존 폼 작업 함수와 초기 상태)를 인자로 받고, state와 dispatch(폼에서 사용하는 새 작업과 최신 폼 상태)를 반환한다
  // <form action={}>에 dispatch를 주입

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex h-10 shrink-0 items-end rounded-lg bg-blue-400 p-4 mb-4 text-center text-xl font-semibold text-white md:h-10'>
        survey
      </div>
      <div className='flex grow'>
        <form action={dispatch} className='flex-col flex space-y-2'>
          <label>
            이름 :
            <input type='text' name='name' placeholder='이름을 입력해 주세요' />
          </label>
          {state?.errors?.name && (
            <div className='mt-1 text-sm text-red-500'>{state.errors.name}</div>
          )}
          <label>
            나이 :
            <input type='text' name='age' placeholder='나이를 입력해 주세요' />
          </label>
          {state?.errors?.age && (
            <div className='mt-1 text-sm text-red-500'>{state.errors.age}</div>
          )}
          <label>
            이메일 :
            <input
              type='text'
              name='email'
              placeholder='이메일을 입력해 주세요'
            />
          </label>
          {state?.errors?.email && (
            <div className='mt-1 text-sm text-red-500'>
              {state.errors.email}
            </div>
          )}
          <label className='mt-4 flex flex-col'>
            전화번호 :
            <input
              type='text'
              name='phone'
              className='mt-1 rounded border-gray-50'
              placeholder='전화번호를 입력해 주세요'
            />
            {state.errors?.phone && (
              <div className='mt-1 text-sm text-red-500'>
                {state.errors.phone}
              </div>
            )}
          </label>
          <label className='flex flex-col'>
            아이디(중복검사) :
            <input
              type='text'
              name='loginId'
              className='mt-1 rounded border-gray-50'
              placeholder='아이디를 입력해주세요'
            />
            {state.errors?.loginId && (
              <div className='mt-1 text-sm text-red-500'>
                {state.errors.loginId}
              </div>
            )}
          </label>
          <label className='mt-4 flex flex-col'>
            비밀번호:
            <input
              type='password'
              name='password'
              className='mt-1 rounded border-gray-50'
              placeholder='비밀번호를 입력해 주세요'
            />
            {state.errors?.password && (
              <div className='mt-1 text-sm text-red-500'>
                {state.errors.password}
              </div>
            )}
          </label>

          <label className='mt-4 flex flex-col'>
            비밀번호 확인:
            <input
              type='password'
              name='passwordConfirm'
              className='mt-1 rounded border-gray-50'
              placeholder='비밀번호를 한번 더 입력해 주세요'
            />
            {state.errors?.passwordConfirm && (
              <div className='mt-1 text-sm text-red-500'>
                {state.errors.passwordConfirm}
              </div>
            )}
          </label>
          <div className='mt-6 flex w-full justify-end'>
            <button
              type='submit'
              className='rounded bg-blue-500 px-3 py-1.5 text-white'
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
