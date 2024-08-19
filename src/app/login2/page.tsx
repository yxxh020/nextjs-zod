'use client';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '@/libs/schemas/userSchema';

// zodResolver: zod 스키마 검증과 폼 검증 프로세스를 통합하는 resolver 함수

export default function Page() {
  const {
    register, //폼 필드에 react hook form 등록
    handleSubmit, //폼 제출할때 호출하는 함수 정의
    formState: { errors }, //폼 상태, 입력 필드의 에러 설정
    watch,
  } = useForm({
    resolver: zodResolver(userSchema), //zod Schema를 사용해서 폼 유효성 검사
    defaultValues: {
      //default 값 설정
      name: '',
      age: undefined,
      email: '',
      phone: '',
      loginId: '',
      password: '',
      passwordConfirm: '',
      agree: '',
      check: '',
      select: '',
    },
  });
  const onSubmit = (formData: FieldValues) => {
    console.log(formData);
    alert('submit');
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex h-10 shrink-0 items-end rounded-lg bg-blue-400 p-4 mb-4 text-center text-xl font-semibold text-white md:h-10'>
        react hook form
      </div>
      <div className='flex grow'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex-col flex space-y-2'
        >
          {/* useFormState와 다른점: form action 사용하지 않고 클라이언트 사이드에서
           서버로 데이터 보내기 전에 입력값 유효성 검사 가능
           */}
          <label>
            이름 :
            <input
              type='text'
              placeholder='이름을 입력해 주세요'
              {...register('name')} //폼 필드 등록
            />
          </label>
          {
            errors.name?.message && (
              <div className='mt-1 text-sm text-red-500'>
                {errors.name?.message}
              </div>
            ) //유효성 검증 실패 에러 표시
          }

          <label>
            나이 :
            <input
              type='number'
              placeholder='나이를 입력해 주세요'
              {...register('age')}
            />
          </label>
          {errors.age?.message && (
            <div className='mt-1 text-sm text-red-500'>
              {errors.age?.message}
            </div>
          )}
          <label>
            이메일 :
            <input
              type='text'
              placeholder='이메일을 입력해 주세요'
              {...register('email')}
            />
          </label>
          {errors.email?.message && (
            <div className='mt-1 text-sm text-red-500'>
              {errors.email?.message}
            </div>
          )}
          <label>
            전화번호 :
            <input
              type='text'
              placeholder='전화번호를 입력해 주세요'
              {...register('phone')}
            />
          </label>
          {errors.phone?.message && (
            <div className='mt-1 text-sm text-red-500'>
              {errors.phone?.message}
            </div>
          )}
          <label>
            아이디(중복검사) :
            <input
              type='text'
              placeholder='아이디를 입력해 주세요'
              {...register('loginId')}
            />
          </label>
          {errors.loginId?.message && (
            <div className='mt-1 text-sm text-red-500'>
              {errors.loginId?.message}
            </div>
          )}
          <label>
            비밀번호 :
            <input
              type='text'
              placeholder='비밀번호를 입력해 주세요'
              {...register('password')}
            />
          </label>
          {errors.password?.message && (
            <div className='mt-1 text-sm text-red-500'>
              {errors.password?.message}
            </div>
          )}
          <label>
            비밀번호 확인:
            <input
              type='text'
              placeholder='비밀번호를 한번 더 입력해 주세요'
              {...register('password')}
            />
          </label>
          {errors.passwordConfirm?.message && (
            <div className='mt-1 text-sm text-red-500'>
              {errors.passwordConfirm?.message}
            </div>
          )}
          <div className='mt-4 flex flex-col'>
            <p>약관동의:</p>
            <div className='mt-1 flex items-center'>
              <label className='mr-4 flex items-center'>
                <input
                  type='radio'
                  value='Y'
                  className='mr-1'
                  {...register('agree')}
                />
                동의
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  value='N'
                  className='mr-1'
                  {...register('agree')}
                />
                동의하지 않음
              </label>
            </div>
          </div>
          {errors.agree?.message && (
            <div className='mt-1 text-sm text-red-500'>
              {errors.agree?.message}
            </div>
          )}
          <div className='mt-4 flex flex-col'>
            <p>체크박스(다중선택):</p>
            <div className='flex space-x-4'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  {...register('agree')}
                  value='soccer'
                  className='mr-1'
                />
                축구
              </label>
              <label className=' flex items-center'>
                <input
                  type='checkbox'
                  {...register('agree')}
                  value='baseball'
                  className='mr-1'
                />
                야구
              </label>
              <label className=' flex items-center'>
                <input
                  type='checkbox'
                  {...register('agree')}
                  value='basketball'
                  className='mr-1'
                />
                농구
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  {...register('agree')}
                  value='tenis'
                  className='mr-1'
                />
                테니스
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  {...register('agree')}
                  value='etc'
                  className='mr-1'
                />
                기타
              </label>
            </div>
            {errors.check?.message && (
              <div className='mt-1 text-sm text-red-500'>
                {errors.check?.message}
              </div>
            )}
          </div>
          <div className='mt-4 flex space-x-4'>
            <p>select:</p>
            <div className='mt-1 flex items-center'>
              <select {...register('select')}>
                <option value='' hidden />
                <option value='none'>없음</option>
                <option value='1'>1 ~ 2회</option>
                <option value='2'>3 ~ 4회</option>
                <option value='3'>5 ~ 6회</option>
                <option value='4'>7회 이상</option>
              </select>
            </div>
            {errors.select?.message && (
              <div className='mt-1 text-sm text-red-500'>
                {errors.select?.message}
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
