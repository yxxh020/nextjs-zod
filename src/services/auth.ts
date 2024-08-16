const API_BASE_URL = process.env.API_BASE_URL;

interface ApiResponse {
  code: number;
  message: string;
  errors?: any[];
}

export const checkUserExists = async (
  loginId: string
): Promise<ApiResponse> => {
  try {
    console.log('아이디 중복체크================');
    const response = await fetch(`${API_BASE_URL}member/user-exist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loginId }),
    });
    const data: ApiResponse = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      message: 'API error',
      errors: [error],
    };
  }
};
