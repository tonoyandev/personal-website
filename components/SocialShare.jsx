import classNames from 'clsx'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'next-share'

const SocialShare = (props) => {
  const { className, url, quote, round = false, size = 32, ...rest } = props

  return (
    <div
      className={classNames(
        'flex flex items-center space-x-2 pt-6 md:flex-col md:space-x-0 md:space-y-2',
        className
      )}
      {...rest}
    >
      <div className="hidden sm:block md:mb-4 md:-rotate-90">Sharing</div>
      <div className="hidden h-px w-6 bg-white sm:block md:h-6 md:w-px"></div>
      <FacebookShareButton url={url} quote={quote}>
        <FacebookIcon size={size} round={round} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={quote}>
        <TwitterIcon size={size} round={round} />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={size} round={round} />
      </LinkedinShareButton>
      <WhatsappShareButton url={url} title={quote} separator=":: ">
        <WhatsappIcon size={size} round={round} />
      </WhatsappShareButton>
      <TelegramShareButton url={url} title={'Tonoyan.DEV Article'}>
        <TelegramIcon size={size} round={round} />
      </TelegramShareButton>
      <EmailShareButton url={url} subject={quote} body="body">
        <EmailIcon size={size} round={round} />
      </EmailShareButton>
    </div>
  )
}

export default SocialShare
