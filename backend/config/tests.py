from django.test import SimpleTestCase


class HealthTest(SimpleTestCase):
    def test_health(self):
        r = self.client.get("/api/health/")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()["status"], "ok")