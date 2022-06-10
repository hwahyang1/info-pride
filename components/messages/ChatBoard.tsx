import MessageItem from './MessageItem'

import { APIResponseOf } from '#utils/api'

const MANAGER_NAME = 'マネージャー'

const ChatBoard = ({ msg }: { msg: NonNullable<APIResponseOf<'Message'>> }) => {
  const { details } = msg

  return (
    <div className="h-5/6 overflow-y-auto">
      {details.map((line, key) => {
        // TODO
        const isSelection = line.messageDetailId.includes('-')
        return line.text ? (
          <MessageItem
            key={key}
            characterId={line.characterId}
            user={line.characterId ? 'others' : 'self'}
          >
            {isSelection && <span className="text-gray-600">[选项] </span>}
            {line.text.replaceAll('{user}', MANAGER_NAME)}
          </MessageItem>
        ) : (
          <MessageItem
            key={key}
            characterId={line.characterId}
            user={line.characterId ? 'others' : 'self'}
          >
            <span className="text-gray-500">[TODO: 其它类别的消息]</span>
          </MessageItem>
        )
      })}
    </div>
  )
}

export default ChatBoard
