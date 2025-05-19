import fetchCdmCardNo from "@/components/verifyModelId";

const verifyDamId = (async () => {
    let cdmCardNo = "xxxx";
  try {
    const damtomoId = 'Integral07';
    const password  = '20040923';
    cdmCardNo = await fetchCdmCardNo(damtomoId, password);
    console.log('取得した cdmCardNo:', cdmCardNo);
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">
        DAM☆ID 検証ページ
      </h1>
        {cdmCardNo}
    </div>
  );
});

export default verifyDamId;