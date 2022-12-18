import { Random } from "random-js";

const random = new Random();

export const randomIcon = () => {
  const profileIcon = [
    <i className="far fa-dizzy"></i>,
    <i className="far fa-angry"></i>,
    <i className="fas fa-chalkboard-teacher"></i>,
    <i className="far fa-flushed"></i>,
    <i className="far fa-grimace"></i>,
    <i className="far fa-grin-tears"></i>,
    <i className="far fa-grin-hearts"></i>,
    <i className="far fa-grin-tongue"></i>,
    <i className="far fa-kiss-beam"></i>,
    <i className="far fa-kiss-wink-heart"></i>,
    <i className="far fa-laugh-wink"></i>,
    <i className="far fa-meh-rolling-eyes"></i>,
    <i className="far fa-sad-tear"></i>,
    <i className="far fa-smile-wink"></i>,
    <i className="fas fa-user-injured"></i>,
    <i className="fas fa-user-secret"></i>,
    <i className="fas fa-user-nurse"></i>,
    <i className="fas fa-user-ninja"></i>,
    <i className="fas fa-user-md"></i>,
    <i className="fas fa-user-tie"></i>,
    <i className="far fa-tired"></i>,
    <i className="far fa-meh-blank"></i>,
  ];

  return profileIcon[random.integer(0, 21)];
};

export const retryDemoLogin = async (dispatch, thunk, setLoadingState) => {
  try {
    let retries = 0;
    let response = await dispatch(thunk());

    if (!response || (response.status && response.status !== 200)) {
      const retryInterval = setInterval(async () => {
        if (
          retries < 2 &&
          (!response || (response.status && response.status !== 200))
        ) {
          response = await dispatch(thunk());
          retries += 1;
        } else {
          setLoadingState(false);
          clearInterval(retryInterval);
        }
      }, 1000);
    }
  } catch (err) {
    console.error(`Error encountered: ${err}`, "ERROR");
  }
};
