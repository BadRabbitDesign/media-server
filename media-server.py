
import log
logger = log.setup_custom_logger('root')
logger.debug('main message')


from app import create_app

Application = create_app('development')



if __name__ == '__main__':
    logger.debug('starting MS Application')
    Application.run()
