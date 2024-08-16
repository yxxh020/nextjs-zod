import Link from 'next/link';

// CSR(Client Side Rendering) 
// 동작방식: 사용자가 페이지에 접근하면 서버에서 최소한의 HTML 파일을 보내주고
// 브라우저에서 js를 실행해 화면을 렌더링해주는 방식
// 장점: 사용자 경험이 좋다. 새로운 html을 받아오는 것이 아니라 필요한 부분만 업데이트 되기 때문에 다른 페이지 이동이 빠르고 깜박거림 없음
// 단점: - SEO(search engine optimization)에 안 걸림
//       - 초기 로딩 시간이 길다

// SSR(Server Side Rendering)
// 동작방식: 사용자가 페이지에 접근하면 서버에서 보여줄 페이지를 미리 모두 구성해서 렌더링 한 뒤,
// 브라우저는 완성된 html을 받아와 바로 표시하는 방식
// 장점: - 초기 로딩 시간이 빠르다. 모든 콘텐츠가 서버에서 렌더링된 상태로 전달되므로 사용자에게 바로 보일수 있다.
//       - SEO에 잘 걸림
// 단점: - 사용자 요청마다 서버가 html 페이지를 생성하게 되면 서버 부하가 커질 수 있다.
//      - 페이지 이동할 때마다 전체 페이지를 다시 불러오면 사용자 경험이 떨어진다.

// SSG(Static Stie Generation)
// 동작방식: 클라이언트에서 필요한 페이지를 미리 준비해뒀다가 요청을 받으면 이미 완성된 파일을 반환하여 브라우저에서 보여지는 방식
// SSR과의 차이점: 요청받을 때 서버에서 즉시 만드는지 미리 만들어 놓는지 차이

// 언제 사용?
// 고객의 데이터를 보호하는 것이 중요하고 검색엔진 노출이 필요없는 사내 서비스 -> CSR
// 상위 노출이 필요하고 검색 유입이 중요한 이커머스 사이트 -> SSR
// 실시간 데이터가 굳이 필요없고 모든 사용자에게 같은 페이지를 보여주는 블로그-> SSG

// Universal Rendering
// 초기 렌더링은 SSR + 페이지 이동은 CSR

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col p-6'>
      <div className='flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 text-4xl font-semibold text-white md:h-52'>
        Softnet
      </div>
      <div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
        <div className='flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20'>
          <p className={` text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            🏡
          </p>
          <Link
            href='/login'
            className='flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base'
          >
            <span>로그인</span>
          </Link>
        </div>
        <div className='flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12'></div>
      </div>
    </main>
  );
}

// NEXT.js 동작과정
// 1. 최초 접속시 서버는 pre-rendering(각 페이지의 html을 미리 생성해 둔 것)된 html과 js 번들 파일을 전달
// 2. 브라우저에서 html을 해석해서 페이지를 렌더링( 아직 유저 인터렉션이 없는 페이지)
// 3. 동시에 클라이언트에서 js파일을 수행해서 initial load 이후에 정적인 html 과 js코드를 매칭시켜(hydration) 인터렉티브한 페이지를 제공
// 4. 페이지를 이동하거나 동작이 발생하는 경우- CRS 방식으로 서버를 거치지 않고 브라우저에서 바로 페이지를 이동한다.

// Hydrate : Server Side 단에서 렌더링 된 정적 페이지와 번들링된 JS파일을 클라이언트에게 보낸 뒤,
//          클라이언트 단에서 HTML 코드와 React인 JS코드를 서로 매칭 시키는 과정
