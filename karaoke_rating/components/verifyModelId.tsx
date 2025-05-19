// fetchCdmCardNo.ts
import { parseStringPromise } from 'xml2js';

export async function fetchCdmCardNo(damtomoId: string, password: string): Promise<string> {
  // 1) ログイン
  const loginRes = await fetch('https://www.clubdam.com/app/damtomo/auth/member/Login.do', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent':      'Mozilla/5.0',
    },
    body: new URLSearchParams({ id: damtomoId, password }).toString(),
    redirect: 'manual',      // ← これで302を自動フォローしない
  });

  if (loginRes.status !== 302) {
    throw new Error(`ログインに失敗しました: ${loginRes.status}`);
  }

  // 302のLocationヘッダやSet‑Cookieを確認して、ちゃんとSESSIONが取れているかをログ出し
  const setCookie = loginRes.headers.get('set-cookie');
  if (!setCookie) {
    throw new Error('ログイン後にセッションクッキーが返ってきませんでした');
  }

  // 2) スコアリングAPIを呼ぶ
  const scoringRes = await fetch(
    'https://www.clubdam.com/app/damtomo/scoring/GetScoringAiListXML.do?pageNo=1',
    {
      headers: {
        'Cookie': setCookie,   // さっき取ったクッキーをここで送る
        'User-Agent': 'Mozilla/5.0',
      },
    }
  );

  if (!scoringRes.ok) {
    throw new Error(`採点履歴APIの呼び出しに失敗しました: ${scoringRes.status}`);
  }

  // 3) XMLをパースしてcdmCardNoを抽出
  const xml = await scoringRes.text();
  const parsed = await parseStringPromise(xml, { explicitArray: false });
  const cdmCardNo = parsed?.data?.cdmCardNo;
  if (!cdmCardNo) {
    throw new Error('cdmCardNo がXMLから見つかりませんでした');
  }

  return cdmCardNo;
}
