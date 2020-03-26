const allowedUpdates = (updates, args) => {
  const allowed = args
  return updates.every((update) => allowed.includes(update))
}

module.exports = { allowedUpdates }
