// external
import { NavigationActions, StackActions } from 'react-navigation';
import { Platform } from 'react-native';

class CustomStackNavigator {
  stack = [];

  push(route) {
    const index = this.stack.indexOf(route);
    if (index < 0) {
      this.stack.push(route);
    } else {
      this.stack = this.stack.slice(0, index + 1);
    }
  }

  pop() {
    if (this.stack.length > 1) this.stack.pop();
  }

  reset() {
    this.stack = [];
  }

  getCurrentRoute() {
    return this.stack[this.stack.length - 1];
  }
}

let navigator;
const customStackNavigation = new CustomStackNavigator();

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function backBehavior(closeApplication) {
  const currentRouteName = customStackNavigation.getCurrentRoute();
  const indexOfCurrentRoute = customStackNavigation.stack.indexOf(currentRouteName);
  customStackNavigation.pop();
  const routeToNavigate = customStackNavigation.getCurrentRoute();
  if (routeToNavigate && indexOfCurrentRoute > 0) {
    navigator.dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: routeToNavigate,
          }),
        ],
      })
    );
  } else {
    closeApplication(true);
  }
}

function push(routeName) {
  customStackNavigation.push(routeName);
}

function navigateMobile(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function navigateAndReset(routeName, params) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    })
  );
}

function navigateAndResetTv(routeName, params) {
  customStackNavigation.reset();
  customStackNavigation.push(routeName);
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    })
  );
}

function navigateTv(routeName, params) {
  customStackNavigation.push(routeName);
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    })
  );
}

function goBack() {
  navigator.dispatch(NavigationActions.back());
}

export default {
  navigate: Platform.isTV ? navigateTv : navigateMobile,
  navigateAndReset: Platform.isTV ? navigateAndResetTv : navigateAndReset,
  setTopLevelNavigator,
  backBehavior,
  customStackNavigation,
  goBack,
  push,
};
