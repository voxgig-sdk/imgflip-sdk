<?php
declare(strict_types=1);

// Imgflip SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ImgflipUtility::setRegistrar(function (ImgflipUtility $u): void {
    $u->clean = [ImgflipClean::class, 'call'];
    $u->done = [ImgflipDone::class, 'call'];
    $u->make_error = [ImgflipMakeError::class, 'call'];
    $u->feature_add = [ImgflipFeatureAdd::class, 'call'];
    $u->feature_hook = [ImgflipFeatureHook::class, 'call'];
    $u->feature_init = [ImgflipFeatureInit::class, 'call'];
    $u->fetcher = [ImgflipFetcher::class, 'call'];
    $u->make_fetch_def = [ImgflipMakeFetchDef::class, 'call'];
    $u->make_context = [ImgflipMakeContext::class, 'call'];
    $u->make_options = [ImgflipMakeOptions::class, 'call'];
    $u->make_request = [ImgflipMakeRequest::class, 'call'];
    $u->make_response = [ImgflipMakeResponse::class, 'call'];
    $u->make_result = [ImgflipMakeResult::class, 'call'];
    $u->make_point = [ImgflipMakePoint::class, 'call'];
    $u->make_spec = [ImgflipMakeSpec::class, 'call'];
    $u->make_url = [ImgflipMakeUrl::class, 'call'];
    $u->param = [ImgflipParam::class, 'call'];
    $u->prepare_auth = [ImgflipPrepareAuth::class, 'call'];
    $u->prepare_body = [ImgflipPrepareBody::class, 'call'];
    $u->prepare_headers = [ImgflipPrepareHeaders::class, 'call'];
    $u->prepare_method = [ImgflipPrepareMethod::class, 'call'];
    $u->prepare_params = [ImgflipPrepareParams::class, 'call'];
    $u->prepare_path = [ImgflipPreparePath::class, 'call'];
    $u->prepare_query = [ImgflipPrepareQuery::class, 'call'];
    $u->result_basic = [ImgflipResultBasic::class, 'call'];
    $u->result_body = [ImgflipResultBody::class, 'call'];
    $u->result_headers = [ImgflipResultHeaders::class, 'call'];
    $u->transform_request = [ImgflipTransformRequest::class, 'call'];
    $u->transform_response = [ImgflipTransformResponse::class, 'call'];
});
