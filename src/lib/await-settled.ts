export async function awaitAllSettled<T, R>(
  list: T[],
  asyncFn: (item: T) => Promise<R>
): Promise<R[]> {
  const promises = list.map(x => asyncFn(x))

  const results = await Promise.allSettled(promises)
  const successfulResponses = results
    .filter(
      (result): result is PromiseFulfilledResult<Awaited<R>> =>
        result.status === 'fulfilled'
    )
    .map(result => result.value)

  return successfulResponses
}
