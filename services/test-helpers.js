export const expectLoadingStateToChangeTo = (expectedNewLoadingState, action, reducer) => {
  const initialState = !expectedNewLoadingState
  const newState = reducer(initialState, action())
  expect(newState).toBe(expectedNewLoadingState)
}
