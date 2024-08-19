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
//
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
            <input type='number' name='age' placeholder='나이를 입력해 주세요' />
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
          <div className='mt-4 flex flex-col'>
            <p>약관동의:</p>
            <div className='mt-1 flex items-center'>
              <label className='mr-4 flex items-center'>
                <input type='radio' name='agree' value='Y' className='mr-1' />
                동의
              </label>
              <label className='flex items-center'>
                <input type='radio' name='agree' value='N' className='mr-1' />
                동의하지 않음
              </label>
            </div>
            {state.errors?.agree && (
              <div className='mt-1 text-sm text-red-500'>
                {state.errors.agree}
              </div>
            )}
          </div>
          <div className='mt-4 flex flex-col'>
            <p>체크박스(다중선택):</p>
            <div className='flex space-x-4'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  name='check'
                  value='soccer'
                  className='mr-1'
                />
                축구
              </label>
              <label className=' flex items-center'>
                <input
                  type='checkbox'
                  name='check'
                  value='baseball'
                  className='mr-1'
                />
                야구
              </label>
              <label className=' flex items-center'>
                <input
                  type='checkbox'
                  name='check'
                  value='basketball'
                  className='mr-1'
                />
                농구
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  name='check'
                  value='tenis'
                  className='mr-1'
                />
                테니스
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  name='check'
                  value='etc'
                  className='mr-1'
                />
                기타
              </label>
            </div>
            {state.errors?.check && (
              <div className='mt-1 text-sm text-red-500'>
                {state.errors.check}
              </div>
            )}
          </div>
          <div className='mt-4 flex space-x-4'>
            <p>select:</p>
            <div className='mt-1 flex items-center'>
              <select name='select'>
                <option value='' hidden />
                <option value='none'>없음</option>
                <option value='1'>1 ~ 2회</option>
                <option value='2'>3 ~ 4회</option>
                <option value='3'>5 ~ 6회</option>
                <option value='4'>7회 이상</option>
              </select>
            </div>
            {state.errors?.select && (
              <div className='mt-1 text-sm text-red-500'>
                {state.errors.select}
              </div>
            )}
          </div>
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
 