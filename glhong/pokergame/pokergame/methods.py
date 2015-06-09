
class PublicMethods:
    def check_session(req, url):
        if 'id' in req.session and 'email' in req.session:
            return True

        return False
